# @minamorl/gen

A CLI scaffold generator for TypeScript, Python, and Rust projects with batteries included.

## Features

- **Multi-language support**: TypeScript, Python, Rust
- **Opinionated defaults**: Modern tooling pre-configured
- **Plugin architecture**: Extensible preset system
- **Interactive & non-interactive modes**: CI/automation friendly
- **Auto git init**: Projects are initialized with git and an initial commit

## Installation

```bash
# Install globally
pnpm add -g @minamorl/gen

# Or run directly with pnpm
pnpm dlx @minamorl/gen init
```

## Usage

### Interactive Mode

```bash
gen init
```

You'll be prompted to select:
1. Language (ts, python, rust)
2. Project name
3. Confirmation

### Non-Interactive Mode

```bash
gen init <language> <project-name> -y
```

Examples:
```bash
# Create TypeScript project
gen init ts my-app -y

# Create Python project
gen init python my-service -y

# Create Rust project
gen init rust my-cli -y

# Create in specific directory
gen init ts my-app -d ./projects -y
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-d, --dir <directory>` | Target directory | `.` (creates folder with project name) |
| `-y, --yes` | Skip prompts (requires language and name) | `false` |

## Generated Projects

### TypeScript (`ts`)

**Tooling:**
- Package manager: pnpm
- Linter/Formatter: Biome
- Test framework: Vitest
- CI: GitHub Actions
- Dev environment: DevContainer

**Project structure:**
```
my-app/
├── .devcontainer/
│   └── devcontainer.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   └── index.ts
├── .gitignore
├── biome.json
├── package.json
├── README.md
└── tsconfig.json
```

**Scripts:**
```bash
pnpm install      # Install dependencies
pnpm dev          # Run in development mode
pnpm build        # Build for production
pnpm test         # Run tests (watch mode)
pnpm test:run     # Run tests once
pnpm lint         # Check linting
pnpm lint:fix     # Fix linting issues
```

### Python (`python`)

**Tooling:**
- Package manager: uv
- Linter/Formatter: Ruff
- Test framework: pytest
- CI: GitHub Actions
- Dev environment: DevContainer

**Project structure:**
```
my-service/
├── .devcontainer/
│   └── devcontainer.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── my_service/
│   └── __init__.py
├── tests/
│   └── test_main.py
├── .gitignore
├── pyproject.toml
├── README.md
└── ruff.toml
```

**Commands:**
```bash
uv sync                 # Install dependencies
uv run my_service       # Run the application
uv run pytest           # Run tests
uv run ruff check .     # Check linting
uv run ruff format .    # Format code
```

### Rust (`rust`)

**Tooling:**
- Package manager: cargo
- Linter: Clippy
- Formatter: rustfmt
- CI: GitHub Actions
- Dev environment: DevContainer

**Project structure:**
```
my-cli/
├── .devcontainer/
│   └── devcontainer.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── lib.rs
│   └── main.rs
├── .gitignore
├── Cargo.toml
├── clippy.toml
└── README.md
```

**Commands:**
```bash
cargo build        # Build the project
cargo run          # Run the application
cargo test         # Run tests
cargo clippy       # Check linting
cargo fmt --check  # Check formatting
```

## Architecture

### Plugin System

Each language preset consists of multiple plugins:

| Plugin Category | TypeScript | Python | Rust |
|-----------------|------------|--------|------|
| Core | pnpm + tsx | uv + hatchling | cargo |
| Linter/Formatter | Biome | Ruff | Clippy |
| Test | Vitest | pytest | built-in |
| CI | GitHub Actions | GitHub Actions | GitHub Actions |
| DevContainer | Node.js image | Python image | Rust image |

### Default Presets

- **ts-default**: ts-core, ts-biome, ts-vitest, ts-github-actions, ts-devcontainer
- **python-default**: python-core, python-ruff, python-pytest, python-github-actions, python-devcontainer
- **rust-default**: rust-core, rust-clippy, rust-github-actions, rust-devcontainer

## Development

```bash
# Clone and install
git clone https://github.com/minamorl/gen.git
cd gen
pnpm install

# Run in development
pnpm dev init ts my-test-project -y

# Run tests
pnpm test

# Build
pnpm build

# Lint
pnpm lint
pnpm lint:fix
```

## License

MIT
