# 🔐 GitHub Repository Setup Guide

Panduan lengkap untuk setup repository GitHub dengan proteksi branch.

## 📋 Table of Contents

1. [Create Repository](#create-repository)
2. [Branch Protection](#branch-protection)
3. [Push to GitHub](#push-to-github)
4. [Fork & Contribute](#fork--contribute)

---

## 1️⃣ Create Repository

### Step 1: Buat Repository Baru di GitHub

1. Login ke https://github.com
2. Click tombol **"New"** atau **"+"** → **"New repository"**
3. Isi form:
   - **Repository name**: `winscan` (atau nama lain)
   - **Description**: `Multi-Chain Blockchain Explorer for Cosmos Ecosystem`
   - **Visibility**: **Public** ✅ (penting!)
   - **Initialize**: Jangan centang apapun (repo sudah ada locally)
4. Click **"Create repository"**

### Step 2: Copy Repository URL

Setelah create, copy URL repository:
```
https://github.com/YOUR_USERNAME/winscan.git
```

---

## 2️⃣ Branch Protection

Setelah push pertama kali, setup branch protection:

### Step 1: Masuk ke Repository Settings

1. Buka repository di GitHub
2. Click **"Settings"** tab
3. Di sidebar kiri, click **"Branches"**

### Step 2: Add Branch Protection Rule

1. Click **"Add branch protection rule"**

2. **Branch name pattern**: `main`

3. **Enable protections** (centang ini):

   ✅ **Require a pull request before merging**
   - ✅ Require approvals: `1`
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (optional)

   ✅ **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging

   ✅ **Require conversation resolution before merging**

   ✅ **Require signed commits** (optional, untuk security ekstra)

   ✅ **Require linear history** (optional)

   ✅ **Do not allow bypassing the above settings**
   - Uncheck "Allow force pushes"
   - Uncheck "Allow deletions"

   ✅ **Restrict who can push to matching branches**
   - Hanya maintainer/owner yang bisa push direct

4. Click **"Create"** atau **"Save changes"**

### Hasil Branch Protection:

- ❌ **Tidak bisa push langsung** ke `main` branch
- ❌ **Tidak bisa force push**
- ❌ **Tidak bisa delete** branch `main`
- ✅ **Harus via Pull Request**
- ✅ **Harus ada approval** dari reviewer
- ✅ **Semua orang harus fork** untuk contribute

---

## 3️⃣ Push to GitHub

### Step 1: Initialize Git (jika belum)

```bash
cd D:\APLIKASI\EXPL-NEW
git init
git branch -M main
```

### Step 2: Add Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/winscan.git
```

Ganti `YOUR_USERNAME` dengan username GitHub Anda.

### Step 3: Add Files

```bash
git add .
```

### Step 4: Commit

```bash
git commit -m "Initial commit: WinScan Multi-Chain Explorer"
```

### Step 5: Push

```bash
git push -u origin main
```

Jika diminta login:
- Username: GitHub username Anda
- Password: Gunakan **Personal Access Token** (bukan password biasa)

#### Cara buat Personal Access Token:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Beri nama: `WinScan Deploy`
4. Select scopes: centang `repo` (full control)
5. Generate token → Copy token (simpan baik-baik!)

---

## 4️⃣ Fork & Contribute

### Untuk Contributor (Orang Lain)

#### Step 1: Fork Repository

1. Buka https://github.com/YOUR_USERNAME/winscan
2. Click tombol **"Fork"** di kanan atas
3. Repository akan di-copy ke account mereka

#### Step 2: Clone Fork

```bash
git clone https://github.com/THEIR_USERNAME/winscan.git
cd winscan
```

#### Step 3: Buat Branch Baru

```bash
git checkout -b feature/new-feature
```

#### Step 4: Buat Changes

```bash
# Edit files...
git add .
git commit -m "feat: add new feature"
```

#### Step 5: Push ke Fork

```bash
git push origin feature/new-feature
```

#### Step 6: Create Pull Request

1. Buka fork repository di GitHub
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Select:
   - **base repository**: `YOUR_USERNAME/winscan` (original)
   - **base branch**: `main`
   - **head repository**: `THEIR_USERNAME/winscan` (fork)
   - **compare branch**: `feature/new-feature`
5. Click **"Create pull request"**
6. Tulis deskripsi perubahan
7. Submit PR

### Untuk Owner (Review PR)

1. Buka **"Pull requests"** tab
2. Review changes:
   - Check **"Files changed"**
   - Add comments jika ada yang perlu diperbaiki
3. Jika OK: Click **"Approve"** dan **"Merge pull request"**
4. Delete branch setelah merge (optional)

---

## 🔒 Security Best Practices

### 1. Protect Sensitive Files

Pastikan `.gitignore` sudah benar:

```gitignore
# Environment variables (PENTING!)
.env
.env*.local
.env.production
/backend-api/.env

# Dependencies
/node_modules
/backend-api/node_modules

# Build output
/.next
/backend-api/dist
```

### 2. Environment Variables

**JANGAN** commit file:
- `.env`
- `.env.production`
- File yang berisi API keys, passwords, secrets

**COMMIT** file example:
- `.env.example` ✅
- `backend-api/.env.example` ✅

### 3. Secrets di GitHub

Untuk Vercel deployment atau CI/CD:

1. Repository → Settings → Secrets and variables → Actions
2. Click **"New repository secret"**
3. Add secrets:
   - `VERCEL_TOKEN`
   - `NEXT_PUBLIC_API_URL`
   - dll

---

## 📊 Repository Structure

Setelah setup, structure GitHub:

```
https://github.com/YOUR_USERNAME/winscan
├── 📁 .github/          # GitHub configs (workflows, etc)
├── 📁 app/              # Next.js app
├── 📁 components/       # React components
├── 📁 Chains/           # Chain configs
├── 📁 backend-api/      # Backend API
├── 📄 README.md         # Main documentation
├── 📄 LICENSE           # MIT License
├── 📄 CONTRIBUTING.md   # Contribution guide
└── 📄 .gitignore        # Git ignore rules
```

---

## ✅ Verification Checklist

Setelah setup, verify:

- [ ] Repository is **Public**
- [ ] `.gitignore` configured correctly
- [ ] No `.env` files in repository
- [ ] `README.md` complete with setup instructions
- [ ] `LICENSE` file added
- [ ] `CONTRIBUTING.md` explains how to fork
- [ ] Branch protection enabled on `main`
- [ ] Can't push directly to `main`
- [ ] Pull request process works
- [ ] Others can fork successfully

---

## 🎯 Result

Setelah setup complete:

✅ **Repository Public** - Semua orang bisa lihat
✅ **Fork Available** - Semua orang bisa fork
✅ **Branch Protected** - Tidak bisa edit langsung
✅ **PR Required** - Harus via pull request
✅ **Review Required** - Butuh approval
✅ **Your Control** - Kamu yang decide merge atau tidak

---

## 🚀 Next Steps

1. **Push to GitHub** ✅
2. **Enable branch protection** ✅
3. **Share repository URL** with community
4. **Review PRs** from contributors
5. **Merge good contributions**

---

## 📞 Need Help?

- GitHub Docs: https://docs.github.com
- Branch Protection: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches

---

**Your code is now safe and open for collaboration! 🎉**
