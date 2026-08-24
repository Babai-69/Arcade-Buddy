import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const saveFeedbackToFirestore = async (feedbackData: any) => {
  return await addDoc(collection(db, 'feedbacks'), {
    ...feedbackData,
    createdAt: serverTimestamp()
  });
};
