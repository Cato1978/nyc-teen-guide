# 🎨 Icone NYC Teen Guide

## Dimensioni Richieste
Devi creare le seguenti icone PNG:

| File | Dimensione | Uso |
|------|------------|-----|
| `icon-72.png` | 72x72 px | Android legacy |
| `icon-96.png` | 96x96 px | Android legacy |
| `icon-128.png` | 128x128 px | Chrome Web Store |
| `icon-144.png` | 144x144 px | iOS/Windows |
| `icon-152.png` | 152x152 px | iOS Retina |
| `icon-192.png` | 192x192 px | PWA standard |
| `icon-384.png` | 384x384 px | PWA large |
| `icon-512.png` | 512x512 px | Play Store / Splash |

## Design Consigliato

### Elementi dell'icona:
- **Sfondo**: Gradiente da `#667eea` a `#764ba2` (il colore primario dell'app)
- **Simbolo centrale**: 🗽 Statua della Libertà stilizzata
- **Stile**: Minimal, moderno, angoli arrotondati per il maskable

### Strumenti Gratuiti per Creare le Icone:

1. **Canva** (gratuito) - https://www.canva.com
   - Template "App Icon"
   - Esporta in tutte le dimensioni

2. **Figma** (gratuito) - https://www.figma.com
   - Community templates per app icons
   - Export multiplo

3. **PWA Asset Generator** (automatico):
   ```bash
   npx pwa-asset-generator logo.png icons/ --background "#667eea" --maskable true --padding "20%"
   ```

4. **App Icon Generator** - https://www.appicon.co/
   - Carica un'immagine 1024x1024
   - Genera automaticamente tutte le dimensioni

## Requisiti Maskable Icon

Per il Play Store, l'icona deve essere "maskable":
- Il contenuto principale deve stare entro il **safe zone** (cerchio centrale 80%)
- Lo sfondo deve coprire l'intera area
- Nessun contenuto importante negli angoli

```
+------------------+
|  ░░░░░░░░░░░░░░  |  ← Zona margine (può essere tagliata)
|  ░+----------+░  |
|  ░|  SAFE    |░  |
|  ░|  ZONE    |░  |  ← Contenuto principale qui
|  ░|   🗽     |░  |
|  ░+----------+░  |
|  ░░░░░░░░░░░░░░  |
+------------------+
```

## Verifica le Icone

Dopo aver creato le icone:
1. Controlla che siano tutte nella cartella `icons/`
2. Verifica che i nomi corrispondano esattamente a quelli nel `manifest.json`
3. Testa con https://pwabuilder.com per vedere l'anteprima
