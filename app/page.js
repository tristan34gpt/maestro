"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      // 🔥 chemin Firestore : /businesses/vinted-revente/articles
      const articlesRef = collection(
        db,
        "businesses",
        "vinted-revente",
        "articles"
      );
      const querySnapshot = await getDocs(articlesRef);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(items);
      console.log("📦 Articles Firestore :", items);
    }

    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Articles - Vinted Revente
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-600">Aucun article pour le moment...</p>
      ) : (
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{a.titre}</p>
              <p>Prix : {a.price} €</p>
              <a
                href={a.url_fournisseur}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Voir le fournisseur
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
