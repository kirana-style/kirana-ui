import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

/**
 * Laravel with Inertia and React, as Kirana's example has it: the PHP side is the smallest app that
 * serves one Inertia page (`composer install` and `php artisan key:generate` set it up), the
 * JavaScript side is Vite with Laravel's plugin. `vite build` needs no PHP; `php artisan serve`
 * beside `vite` is development.
 */
export const laravelInertia: AppSkeleton = {
  template: "laravel-inertia",
  framework: "react",
  title: "Kirana on Laravel with Inertia",
  source: "resources/js",
  document: "resources/views/app.blade.php",
  output: "public/build",
  files: {
    "resources/js/app.tsx": `import "@kirana-style/core/stylesheet.css"
import { createInertiaApp } from "@inertiajs/react"
import type { ComponentType } from "react"
import { createRoot } from "react-dom/client"

const pages = import.meta.glob<{ default: ComponentType }>("./pages/**/*.tsx", {
  eager: true,
})

createInertiaApp({
  resolve: (name) => pages[\`./pages/\${name}.tsx\`]!,
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
`,
    "resources/js/pages/Home.tsx": `import { css } from "@kirana-style/core"

const styles = {
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "100svh",
    textAlign: "center",
  }),
  command: css({ fontFamily: "monospace" }),
}

export default function Home() {
  return (
    <main sx={styles.main}>
      <div>
        <h1>${WELCOME.heading}</h1>
        <p>${WELCOME.text}</p>
        <code sx={styles.command}>${WELCOME.command}</code>
      </div>
    </main>
  )
}
`,
    "resources/views/app.blade.php": `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>Kirana on Laravel with Inertia</title>
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
`,
    "routes/web.php": `<?php

use Illuminate\\Support\\Facades\\Route;

Route::inertia('/', 'Home');
`,
    "app/Http/Middleware/HandleInertiaRequests.php": `<?php

namespace App\\Http\\Middleware;

use Inertia\\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';
}
`,
    "bootstrap/app.php": `<?php

use App\\Http\\Middleware\\HandleInertiaRequests;
use Illuminate\\Foundation\\Application;
use Illuminate\\Foundation\\Configuration\\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(web: __DIR__.'/../routes/web.php')
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [HandleInertiaRequests::class]);
    })
    ->create();
`,
    "bootstrap/cache/.gitignore": `*
!.gitignore
`,
    "public/index.php": `<?php

use Illuminate\\Foundation\\Application;
use Illuminate\\Http\\Request;

define('LARAVEL_START', microtime(true));

require __DIR__.'/../vendor/autoload.php';

/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
`,
    artisan: `#!/usr/bin/env php
<?php

use Illuminate\\Foundation\\Application;
use Symfony\\Component\\Console\\Input\\ArgvInput;

define('LARAVEL_START', microtime(true));

require __DIR__.'/vendor/autoload.php';

/** @var Application $app */
$app = require_once __DIR__.'/bootstrap/app.php';

$status = $app->handleCommand(new ArgvInput);

exit($status);
`,
    "composer.json": `{
  "name": "my-app/my-app",
  "type": "project",
  "require": {
    "php": "^8.3",
    "inertiajs/inertia-laravel": "^3.7",
    "laravel/framework": "^13.40"
  },
  "autoload": {
    "psr-4": {
      "App\\\\": "app/"
    }
  },
  "config": {
    "sort-packages": true
  },
  "minimum-stability": "stable",
  "prefer-stable": true
}
`,
    ".env.example": `APP_NAME=my-app
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
LOG_CHANNEL=stderr
SESSION_DRIVER=file
CACHE_STORE=file
`,
    "storage/framework/cache/data/.gitignore": `*
!.gitignore
`,
    "storage/framework/sessions/.gitignore": `*
!.gitignore
`,
    "storage/framework/views/.gitignore": `*
!.gitignore
`,
    "storage/logs/.gitignore": `*
!.gitignore
`,
  },
  dependencies: ["@inertiajs/react", "react", "react-dom"],
  devDependencies: [
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "laravel-vite-plugin",
    "typescript",
    "vite",
  ],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: {
    dev: "vite",
    build: "vite build",
    serve: "php artisan serve",
  },
  typecheck: "tsc --noEmit",
  vite: {
    imports: [
      'import react from "@vitejs/plugin-react"',
      'import laravel from "laravel-vite-plugin"',
    ],
    plugins: [
      "kirana()",
      'laravel({ input: "resources/js/app.tsx", refresh: true })',
      "react()",
    ],
    note: "Kirana ahead of React, so pages reach React's compiler with `sx` already a class; Laravel's plugin builds into public/build.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "react-jsx",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["vite/client", "@kirana-style/core/react"],
    },
    include: ["resources/js", "*.ts"],
  },
  ignore: ["vendor/", "composer.lock", "public/build/", "public/hot"],
}
