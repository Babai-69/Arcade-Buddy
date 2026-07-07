import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

export interface SupportQuery {
  id?: string;
  name: string;
  email: string;
  profileUrl: string;
  queryType: string;
  message: string;
  attachments: any[];
  createdAt: string;
  status: 'Open' | 'Resolved';
}

export async function uploadAttachments(files: FileList): Promise<{filename: string, content: string}[]> {
  const attachments: {filename: string, content: string}[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Extract base64 part
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      attachments.push({
        filename: file.name,
        content: base64
      });
    } catch (error) {
      console.error(`Failed to process file ${file.name}:`, error);
    }
  }
  
  return attachments;
}

export const submitSupportQuery = async (queryData: Omit<SupportQuery, 'id' | 'createdAt' | 'status'>) => {
  let emailSuccess = false;
  let errorMessage = '';

  // Call our backend API to send an email notification FIRST
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    
    const response = await fetch('/api/notify-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Email notification failed with status ${response.status}`);
    }
    
    const data = await response.json();
    if (data.success && data.emailSent !== false) {
      emailSuccess = true;
    } else {
      emailSuccess = false;
      errorMessage = data.message || 'Unknown email error';
    }
  } catch (e: any) {
    console.error("Failed to send email notification", e);
    emailSuccess = false;
    errorMessage = e.message;
  }

  if (!emailSuccess) {
    // Try writing to Firestore if email failed, but don't let it hang forever
    try {
      const queriesRef = collection(db, 'queries');
      
      // Remove base64 content from attachments before saving to Firestore to avoid 1MB limit
      const firestoreAttachments = queryData.attachments.map((att: any) => 
        typeof att === 'object' && att.filename ? att.filename : att
      );

      const docData = {
        ...queryData,
        attachments: firestoreAttachments,
        createdAt: new Date().toISOString(),
        status: 'Open',
        errorDetails: errorMessage, // Optionally track why it failed
      };
      
      // We use Promise.race to enforce a timeout on addDoc
      const addDocPromise = addDoc(queriesRef, docData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore write timeout')), 5000)
      );
      
      await Promise.race([addDocPromise, timeoutPromise]);
    } catch (e) {
      console.error("Failed to write to Firestore:", e);
      // Even if Firestore fails, if the email succeeded, we still return true
      // so the user knows their query went through via email.
    }
  }

  return { emailSuccess, errorMessage };
};

export const getSupportQueries = async (): Promise<SupportQuery[]> => {
  try {
    const queriesRef = collection(db, 'queries');
    const q = query(queriesRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SupportQuery[];
  } catch (error) {
    console.warn("Failed to fetch support queries (offline):", error);
    return [];
  }
};
