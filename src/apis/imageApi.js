import {
  getStorage,
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../config/firebase_config";

export const postImages = async (blob) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now()}.png`);

    // 画像をStorageにアップロード
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);

    // Firestoreに画像のURLを保存
    const col = collection(firestore, "images");
    await addDoc(col, {
      url: downloadURL,
      createdAt: new Date(),
    });

    console.log("Saved downloadUrl correctly.");
  } catch (error) {
    console.error("Error in uploading image or saving URL:", error);
  }
};

export const fetchImages = async () => {
  const storage = getStorage();
  const listRef = ref(storage, "images/"); // 'images/' はあなたのファイルが保存されているディレクトリ

  try {
    const res = await listAll(listRef);
    const fileRefs = res.items;

    // 最新10件のファイルのURLを取得
    const urls = await Promise.all(
      fileRefs
        .reverse()
        .slice(0, 10)
        .map((fileRef) => getDownloadURL(fileRef))
    );

    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
