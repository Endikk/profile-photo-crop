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
git clone https://github.com/votre-utilisateur/face-cropper.git
cd face-cropper
