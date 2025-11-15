# Contributing to WinScan

Thank you for your interest in contributing to WinScan! 🎉

## 🔒 Repository Rules

This repository is **protected**. You cannot push directly to the main branch.

### How to Contribute

1. **Fork the repository** (Click "Fork" button)
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/winscan.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes**
5. **Test thoroughly**
   ```bash
   npm run build
   npm run dev
   ```
6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request** from your fork to the main repository

## 📋 Contribution Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier + ESLint)
- Write meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add validator uptime tracking
fix: resolve transaction pagination issue
docs: update deployment guide
```

### Pull Request Process

1. Update README.md if needed
2. Ensure all tests pass
3. Update documentation for new features
4. Request review from maintainers
5. Address review feedback
6. Wait for approval and merge

### What to Contribute

**We welcome:**
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌍 Translation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations

**Please avoid:**
- ❌ Breaking changes without discussion
- ❌ Large refactors without prior approval
- ❌ Unrelated changes in single PR
- ❌ Direct pushes to main branch

## 🚫 Protected Branch Rules

The `main` branch has the following protections:

- ✅ Require pull request before merging
- ✅ Require review from code owners
- ✅ Dismiss stale pull request approvals
- ✅ Require status checks to pass
- ❌ No direct pushes allowed
- ❌ No force pushes allowed

## 🧪 Testing

Before submitting a PR:

```bash
# Test build
npm run build

# Test locally
npm run dev

# Check for errors
npm run lint
```

## 📞 Questions?

- Open an [Issue](https://github.com/YOUR_USERNAME/winscan/issues)
- Start a [Discussion](https://github.com/YOUR_USERNAME/winscan/discussions)

## 🙏 Thank You!

Your contributions help make WinScan better for everyone in the Cosmos ecosystem!
