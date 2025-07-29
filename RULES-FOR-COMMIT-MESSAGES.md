# 📝 Git Commit Message Rules

This guide defines how to write clear, consistent, and meaningful commit messages for this repository. Follow these rules to improve collaboration, readability, and traceability of changes.

---

## ✍️ General Format

```
<type>: <filename> - <short description of change>
```

### 🔹 Types

| Type       | Use for...                       | Example                                             |
| ---------- | -------------------------------- | --------------------------------------------------- |
| `add`      | Adding new files or features     | `add: login.js - initial login form`                |
| `edit`     | Editing or modifying files       | `edit: login.js - fixed form validation`            |
| `remove`   | Deleting files or features       | `remove: old-login.js - deprecated login file`      |
| `rename`   | Renaming files or folders        | `rename: auth.js → authentication.js`               |
| `move`     | Moving files to another location | `move: login.js → components/auth/`                 |
| `fix`      | Bug fixes                        | `fix: login.js - resolved null pointer on submit`   |
| `refactor` | Code cleanup, no behavior change | `refactor: login.js - simplify error handling`      |
| `docs`     | Documentation changes            | `docs: README.md - added setup instructions`        |
| `test`     | Adding or updating tests         | `test: login.test.js - added test for failed login` |

---

## ✅ Commit Message Guidelines

* Use **present tense**, e.g., "`add`" not "`added`"
* Be **concise but descriptive**
* Keep filenames and paths **relative** to the repo
* Avoid vague messages like "`changes`", "`update`", "`fix bug`"
* Group related small changes into a single commit

---

## 📌 Notes

* Use `:` (colon) to separate the type from the filename.
* Use `-` (dash) to separate the filename from the description.
* For multiple files, either list each or use general descriptions:

  ```
  edit: login.js, signup.js - updated form styles for consistency
  ```
