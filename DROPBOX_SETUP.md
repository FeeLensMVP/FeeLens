# 🚀 Configuration Dropbox pour FeeLens

## 📋 Étapes de configuration

### 1. Créer une app Dropbox
1. **Allez sur** : https://www.dropbox.com/developers/apps
2. **Cliquez sur** "Create app"
3. **Choisissez** :
   - API: "Dropbox API"
   - Access: "Full Dropbox"
   - App name: "FeeLens Backups" (ou ce que vous voulez)

### 2. Générer un token d'accès
1. **Dans votre app**, allez dans l'onglet "Settings"
2. **Dans la section "OAuth 2"**, cliquez sur "Generate access token"
3. **Copiez le token** (il commence par `sl.`)

### 3. Configurer le .env.local
```bash
echo "DROPBOX_ACCESS_TOKEN=votre_token_ici" >> .env.local
```

### 4. Redémarrer l'application
```bash
./stop-dev.sh
./start-dev.sh
```

## ✅ Test
1. **Allez sur** `http://localhost:3000/upload`
2. **Sélectionnez un fichier** et **cliquez sur "Upload"**
3. **Vérifiez les logs** dans le terminal

## 🎯 Résultat attendu
- ✅ Fichiers organisés dans `/FeeLens/[nom_entreprise]/`
- ✅ Liens partagés publics générés automatiquement
- ✅ Pas de quota Service Account
- ✅ Configuration en 5 minutes !

## 🔧 Avantages vs Google Drive
- ✅ **Plus simple** : Pas de Service Account complexe
- ✅ **Plus fiable** : Pas de problème de quota
- ✅ **Plus rapide** : Configuration immédiate
- ✅ **Gratuit** : 2GB à vie (extensible)
