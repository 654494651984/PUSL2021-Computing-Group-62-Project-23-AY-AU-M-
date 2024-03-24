// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBvVFDHSA6mCnmD-De_VS5Vw9RFeyBLiqg',
	authDomain: 'dewindi-cgp.firebaseapp.com',
	projectId: 'dewindi-cgp',
	storageBucket: 'dewindi-cgp.appspot.com',
	messagingSenderId: '781355054746',
	appId: '1:781355054746:web:f7917916c4feb88964d123'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// create user account
export const createUser = async (email: string, password: string, name: string) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	const user = userCredential.user;
	await updateProfile(user, { displayName: name });
	return user;
};

// sign in user
export const signIn = async (email: string, password: string) => {
	const user = await signInWithEmailAndPassword(auth, email, password);
	return user;
};

// add medication
export const addMedication = async (
	medname: string,
	meddose: string,
	medman: string,
	price: string,
	location: string,
	pharmname: string
) => {
	const user = auth.currentUser;
	const db = getFirestore(app);
	const docRef = await addDoc(collection(db, 'medications'), {
		medname: medname,
		meddose: meddose,
		medman: medman,
		medprice: price,
		location: location,
		pharmname: pharmname,
		uid: user?.uid
	});
	return docRef;
};

// set pharmacy information
export const setPharmacy = async (pharmname: string, location: string, contact: string) => {
	const user = auth.currentUser;
	const db = getFirestore(app);
	const ref = doc(db, `pharmacy/${user?.uid}`);
	await setDoc(ref, { pharmname: pharmname, location: location, contact: contact });
};

// get pharmacy information
export const getPharmacy = async () => {
	const user = auth.currentUser;
	const db = getFirestore(app);
	const docRef = doc(db, `pharmacy/${user?.uid}`);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

interface medications {
	medname: string;
	meddose: string;
	medman: string;
	medprice: string;
	location: string;
	pharmname: string;
	uid: string;
}

// get my medications
export const getMyMeds = async (location: string, pharmname: string) => {
	const db = getFirestore(app);
	const q = query(
		collection(db, 'medications'),
		where('location', '==', location),
		where('pharmname', '==', pharmname)
	);
	const querySnapshot = await getDocs(q);
	const meds: medications[] = [];
	querySnapshot.forEach((doc) => {
		meds.push(doc.data() as medications);
	});
	return meds;
};

// delete medication
export const deleteMed = async (medid: string) => {
	const db = getFirestore(app);
	await deleteDoc(doc(db, `medications/${medid}`));
};

// get orders
export const getOrders = async (pharmname: string) => {
	const db = getFirestore(app);
	const q = query(collection(db, 'orders'), where('pharmname', '==', pharmname));
	const querySnapshot = await getDocs(q);
	const orders: unknown[] = [];
	querySnapshot.forEach((doc) => {
		orders.push(doc.data());
	});
	return orders;
};
