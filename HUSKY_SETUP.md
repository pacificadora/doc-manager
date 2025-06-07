# Husky Setup Documentation

This document outlines the complete setup process for Husky, lint-staged, and commitlint in our project.

## 1. Installation

```bash
# Install Husky
npm install husky --save-dev

# Install lint-staged and commitlint
npm install --save-dev lint-staged @commitlint/cli @commitlint/config-conventional
```

**Why?**
- `husky`: Manages Git hooks
- `lint-staged`: Runs linters on staged files
- `@commitlint/cli`: Validates commit messages
- `@commitlint/config-conventional`: Provides conventional commit rules

## 2. Package.json Configuration

```bash
# Add prepare script to package.json
npm pkg set scripts.prepare="husky"
```

**Why?**
- The `prepare` script runs automatically after `npm install`
- Ensures Husky is properly set up for all developers who clone the repository
- Makes the setup process automatic and consistent across the team

## 3. Commitlint Configuration

Created `commitlint.config.js`:
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

**Why?**
- Enforces conventional commit message format
- Makes commit history more readable and maintainable
- Enables automatic versioning and changelog generation
- Standard commit types:
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation changes
  - `style`: Code style changes
  - `refactor`: Code changes
  - `perf`: Performance improvements
  - `test`: Adding or modifying tests
  - `chore`: Changes to the build process

## 4. Lint-staged Configuration

Created `.lintstagedrc`:
```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

**Why?**
- Runs linters only on staged files
- Improves performance by not checking unchanged files
- Different rules for different file types:
  - JavaScript/TypeScript files: ESLint + Prettier
  - JSON/Markdown files: Prettier only

## 5. Git Hooks Setup

### Pre-commit Hook
Created `.husky/pre-commit`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**Why?**
- Runs before each commit
- Executes lint-staged to check staged files
- Prevents commits with linting errors

### Commit-msg Hook
Created `.husky/commit-msg`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx commitlint --edit $1
```

**Why?**
- Runs after commit message is created
- Validates commit message format
- Ensures consistent commit message style

## 6. Making Hooks Executable

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

**Why?**
- Git hooks must be executable to work
- Ensures hooks can be run by Git

## Usage

### Making Commits
```bash
# Valid commit message
git commit -m "feat: add new login button"

# Invalid commit message (will be rejected)
git commit -m "added new button"
```

### What Happens on Commit
1. Pre-commit hook runs:
   - lint-staged checks staged files
   - ESLint and Prettier fix issues
   - If there are unfixable issues, commit is blocked

2. Commit-msg hook runs:
   - Validates commit message format
   - If message doesn't follow convention, commit is blocked

## Troubleshooting

### Common Issues
1. Hooks not running:
   - Check if `.husky` directory exists
   - Verify hooks are executable
   - Ensure Husky is properly installed

2. Commit message rejected:
   - Follow conventional commit format
   - Use one of the standard commit types
   - Include a descriptive message

3. Linting errors:
   - Fix issues in your code
   - Run `npm run lint` locally to check for issues
   - Check ESLint and Prettier configurations

## Maintenance

### Updating Dependencies
```bash
# Update Husky
npm install husky@latest --save-dev

# Update other tools
npm install lint-staged@latest @commitlint/cli@latest @commitlint/config-conventional@latest --save-dev
```

### Adding New Hooks
1. Create new hook file in `.husky` directory
2. Make it executable
3. Add your commands
4. Test the hook

## Best Practices
1. Always use conventional commit messages
2. Keep commit messages clear and descriptive
3. Run linting locally before committing
4. Keep dependencies up to date
5. Document any custom hooks added to the project 