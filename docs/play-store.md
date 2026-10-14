# BIVORA na Google Play Store

BIVORA ide na Play Store kao **TWA** (Trusted Web Activity): Android aplikacija koja otvara bivora.app preko cijelog ekrana, bez trake preglednika. Kad promijeniš nešto na stranici, promjena se odmah vidi i u aplikaciji. Novu verziju na Play Store ne moraš slati.

## 1. Prije početka

- Play Console račun **BIVORA** mora biti verificiran (dokument, telefon, Android uređaj).
- Na bivora.app mora biti objavljena zadnja verzija (manifest, ikone, service worker).

## 2. Napravi Android paket (PWABuilder)

1. Otvori **https://www.pwabuilder.com**
2. Upiši `https://bivora.app` i klikni **Start**
3. Klikni **Package For Stores** → kod **Android** klikni **Generate Package**
4. Provjeri polja:
   - **Package ID**: `app.bivora.twa`
   - **App name**: `BIVORA`
   - **Launcher name**: `BIVORA`
   - **Signing key**: ostavi **Create new**
5. Klikni **Download Package**. Dobiješ ZIP.

**Važno:** u ZIP-u su `signing.keystore` i `signing-key-info.txt`. Spremi ih na sigurno (npr. Google Drive), jer bez njih ne možeš objaviti novu verziju aplikacije.

## 3. Pošalji Claudeu otisak ključa

U ZIP-u otvori `assetlinks.json` i pošalji mi njegov sadržaj (ili screenshot). Ja ga stavim na `bivora.app/.well-known/assetlinks.json`. Tako Android zna da aplikacija i stranica pripadaju tebi i skriva traku preglednika.

## 4. Objavi na Play Console

**Napomena za osobni račun:** Google traži da nova aplikacija prvo bude u **zatvorenom testiranju** s najmanje **12 testera** kroz **14 dana**. Tek tada se otključa Production. Pripremi 12 Gmail adresa (prijatelji, kolege, klijenti) koji će instalirati aplikaciju.

1. **play.google.com/console** → **Create app**
2. Ime: `BIVORA`, jezik: hrvatski, **App**, **Free**
3. Lijevo **Test and release** → **Testing** → **Closed testing** → **Create new release** (nakon 14 dana isto ponovi pod **Production**)
4. Uploadaj `.aab` fajl iz ZIP-a
5. Ispuni **Store listing**:
   - kratki opis (do 80 znakova), dugi opis
   - ikona 512×512 (`icon-512.png`)
   - feature grafika 1024×500
   - najmanje 2 screenshota s mobitela
6. **Privacy policy**: `https://bivora.app/privacy`
7. Ispuni **App content** (oglasi: nema, ciljna skupina: 18+, Data safety)
8. **Send for review**

Google pregled obično traje nekoliko dana.
