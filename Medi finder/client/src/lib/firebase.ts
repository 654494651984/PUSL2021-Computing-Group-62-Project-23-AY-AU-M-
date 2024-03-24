// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
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

// get unique locations from /medications collection
export const getLocations = async () => {
	const locations: string[] = [];
	const querySnapshot = await getDocs(collection(getFirestore(app), 'medications'));
	querySnapshot.forEach((doc) => {
		const location = doc.data().location;
		if (!locations.includes(location)) {
			locations.push(location);
		}
	});
	return locations;
};

// create order
export const createOrder = async (
	medname: string,
	meddose: string,
	medman: string,
	price: string,
	pharmname: string,
	userid: string,
	email: string,
	qty: number
) => {
	await addDoc(collection(getFirestore(app), 'orders'), {
		medname,
		meddose,
		medman,
		price,
		pharmname,
		userid,
		email,
		qty
	});
};

// get orders by user id
export const getOrders = async (userid: string) => {
	const orders: unknown[] = [];
	const q = query(collection(getFirestore(app), 'orders'), where('userid', '==', userid));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		orders.push(doc.data());
	});
	return orders;
};

// get pharmacies by phamaname
export const getPharmacies = async (pharmname: string) => {
	const pharmacies: unknown[] = [];
	const q = query(collection(getFirestore(app), 'pharmacy'), where('pharmname', '==', pharmname));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		pharmacies.push(doc.data());
	});
	return pharmacies;
};

export const getPharmaciesByLocation = async (location: string) => {
	const pharmacies: unknown[] = [];
	const q = query(collection(getFirestore(app), 'pharmacy'), where('location', '==', location));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		pharmacies.push(doc.data());
	});
	return pharmacies;
};
