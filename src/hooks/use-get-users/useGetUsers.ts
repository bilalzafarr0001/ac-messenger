import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { User } from "interfaces";
import { useEffect, useState } from "react";
import { db } from "setup/firebase";

const useGetUsers = (userID?: string) => {
  const [users, setUsers] = useState<User[]>();
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let usersColRef: CollectionReference;

  const getUsers = async (userID?: string) => {
    try {
      setIsPending(true);
      setErrorMsg("");

      //  Exclude current user in the results when theres userID.
      if (userID) {
        usersColRef = query(
          collection(db, "users"),
          where("uid", "!=", userID),
          orderBy("uid")
        ) as CollectionReference;
      } else {
        usersColRef = collection(db, "users") as CollectionReference;
      }

      const data = await getDocs(usersColRef as CollectionReference);

      const users = data.docs.map((doc) => {
        return { ...doc.data() };
      }) as User[];

      setUsers(users);
      setIsPending(false);
    } catch (error: any) {
      setIsPending(false);
      setErrorMsg(error.message);
    }
  };

  const searchUser = async (searchVal: string, currentUser?: User) => {
    try {
      if (!searchVal) {
        return getUsers(currentUser?.uid);
      }

      setErrorMsg("");

      const usersColRef = query(
        collection(db, "users"),
        where("displayName", "!=", currentUser?.displayName || ""),
        where("displayName", ">=", searchVal),
        where("displayName", "<=", searchVal + "\uf8ff")
      );

      const data = await getDocs(usersColRef);

      const users = data.docs.map((doc) => {
        console.log(doc.data());

        return { ...doc.data() };
      }) as User[];

      setUsers(users);
    } catch (error: any) {
      setIsPending(false);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getUsers(userID);
  }, []);

  return { users, isPending, errorMsg, getUsers, searchUser };
};

export default useGetUsers;
