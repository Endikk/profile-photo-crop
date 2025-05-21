# 📸 FaceCropper

**FaceCropper** est une application React simple qui permet de :
- Charger une image depuis votre appareil,
- Détecter automatiquement un visage avec `face-api.js`,
- Recadrer l'image autour du visage détecté (avec une marge configurable),
- Afficher l'image recadrée.

Ce projet combine **IA embarquée** pour la détection faciale et une **expérience utilisateur fluide** grâce à `react-easy-crop`.

## 🚀 Fonctionnalités

- 📂 Upload d'image via un `<input type="file">`
- 🧠 Détection faciale avec `face-api.js` (modèle léger `TinyFaceDetector`)
- ✂️ Recadrage automatique autour du visage détecté avec marge
- 🔍 Aperçu interactif avec zoom et déplacement via `react-easy-crop`
- 🖼 Génération d’une image recadrée propre à afficher ou sauvegarder

## 🧰 Technologies utilisées

- [React](https://reactjs.org/)
- [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop)
- [face-api.js](https://github.com/justadudewhohacks/face-api.js)

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Endikk/profile-photo-crop.git
cd face-cropper
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Télécharger les modèles `face-api.js`
Télécharge les fichiers du modèle `tiny_face_detector` depuis : 👉 https://github.com/justadudewhohacks/face-api.js-models
Place-les dans un dossier `public/model/` comme ceci :

```
public/
└── model/
    ├── tiny_face_detector_model-weights_manifest.json
    └── tiny_face_detector_model-shard1
```

### 🧪 Utilisation
Lance le projet localement :

```bash
npm start
```

Puis ouvre dans ton navigateur : http://localhost:3000

### 📝 Extrait de code principal
Le composant `FaceCropper` permet de :
* Charger une image,
* Détecter un visage avec `face-api.js`,
* Utiliser un `<canvas>` pour recadrer l'image autour du visage.

```jsx
const detection = await faceapi.detectSingleFace(
  image,
  new faceapi.TinyFaceDetectorOptions()
);

if (detection) {
  const { x, y, width, height } = detection.box;
  // Ajout de marges et création d'un canvas recadré
}
```

### 📁 Structure du projet

```
src/
├── components/
│   └── FaceCropper.js
├── App.js
└── index.js
```

### ⚠️ Remarques
* Le projet utilise des modèles IA en local via `/public/model`. Assure-toi que ces fichiers sont bien présents.
* `react-easy-crop` permet un zoom manuel, mais le recadrage final est calculé par l'IA.
* Si aucun visage n'est détecté, aucun recadrage ne sera affiché.

### 🤝 Contribuer
Les contributions sont les bienvenues ! N'hésite pas à ouvrir une **issue** ou soumettre une **pull request**.

### 📄 Licence
MIT
