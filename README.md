# Модуль Т41 — Запуск в CI

Это минимальный учебный проект для демонстрации GitHub Actions: workflow запускается на push в `main`, pull request и вручную через `workflow_dispatch`.

## Запуск локально (Windows / VS Code)

Откройте терминал в корне проекта и выполните:

```bash
npm ci
npm run typecheck
npm run lint
npm run format:check
npm test
```

## Как увидеть запуск в GitHub Actions

1. Создайте пустой репозиторий на GitHub.
2. Распакуйте архив и откройте папку проекта.
3. Инициализируйте Git и отправьте файлы в ветку `main`:

   ```bash
   git init
   git add .
   git commit -m "Add CI workflow"
   git branch -M main
   git remote add origin https://github.com/ВАШ-АККАУНТ/ВАШ-РЕПОЗИТОРИЙ.git
   git push -u origin main
   ```

4. На GitHub откройте вкладку **Actions** и выберите запуск **Autotests**.
5. Откройте завершённый запуск, затем job `test`. Внизу найдите `Upload artifact` и проверьте артефакт `playwright-report`.

## Важное замечание

Workflow сохраняет шаги из учебного примера, включая установку Chromium через Playwright. Сам пример использует встроенный Node.js test runner для smoke-проверок, а не полноценный Playwright Test suite. Для демонстрации загрузки артефакта тест создаёт простой HTML-файл в папке `playwright-report`; это не нативный HTML-отчёт Playwright. Проверки `typecheck`, `lint` и `format:check` здесь намеренно лёгкие, самодостаточные учебные проверки без дополнительных npm-зависимостей. Если проекту нужны настоящие TypeScript/ESLint/Prettier и Playwright-тесты, добавьте их зависимости и конфигурацию.

Версии `actions/checkout@v5`, `actions/setup-node@v6` и `actions/upload-artifact@v5` указаны как в примере урока; перед публикацией проверьте их актуальность в GitHub Marketplace.
