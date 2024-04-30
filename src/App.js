import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyA1H6I-DbKG81gVM_OCRKiuwG4-tftR26Q",
  authDomain: "marketplace-5e490.firebaseapp.com",
  projectId: "marketplace-5e490",
  storageBucket: "marketplace-5e490.appspot.com",
  messagingSenderId: "796334267926",
  appId: "1:796334267926:web:85ec86036ca86eb5a45f37",
  measurementId: "G-FE05QJHDL9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, emailRegister, passwordRegister);
      console.log('Registrierung erfolgreich!');
    } catch (error) {
      setError(error.message);
      console.error('Fehler während der Registrierung:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailLogin, passwordLogin);
      console.log('Login erfolgreich!');
      setLoggedIn(true);
      fetchProducts(); 
    } catch (error) {
      setError(error.message);
      console.error('Fehler während des Logins:', error.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setProducts([]);
  };

  const handleAddProduct = async () => {
    try {
      
      const docRef = await addDoc(collection(db, 'products'), {
        name: productName,
        price: `${productPrice} CHF`,
        description: productDescription,
        userId: auth.currentUser.uid 
      });
      console.log('Produkt hinzugefügt mit ID: ', docRef.id);
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      fetchProducts(); 
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Produkts: ', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      console.log('Produkt gelöscht mit ID: ', productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Fehler beim Löschen des Produkts: ', error);
    }
  };

  return (
    <div className="App">
      <div className="logo-placeholder"></div>
      {!loggedIn ? (
        <div className="container">
          <h2 className="title">Marketplace</h2>
          <div className="form-group">
            <h3>Benutzer-Authentifizierung</h3>
            <div>
              <input
                type="email"
                placeholder="E-Mail"
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Passwort"
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
              />
            </div>
            <button onClick={handleRegister}>Registrieren</button>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="form-group">
            <h3>Login</h3>
            <div>
              <input
                type="email"
                placeholder="E-Mail"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Passwort"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      ) : (
        <div className="container">
          <h2 className="title">Willkommen, {auth.currentUser.email}</h2>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <div className="form-group">
            <h3>Produkt hinzufügen</h3>
            <div>
              <input
                type="text"
                placeholder="Produktname"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Preis"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Beschreibung"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <button onClick={handleAddProduct}>Produkt hinzufügen</button>
          </div>
          <div className="product-list">
            <h3>Produkte</h3>
            <ul>
              {products.map(product => (
                <li key={product.id}>
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                  <div>{product.description}</div>
                  <button onClick={() => handleDeleteProduct(product.id)}>Löschen</button>
                  <button>Kaufen</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

