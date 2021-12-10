const mix = require("laravel-mix");

mix
	.combine(['src/app.js','src/customizer.js','src/ajax.js','src/setting.js','src/notification.js'],'dist/app.js')
	.postCss("src/app.css", "dist", [require("tailwindcss")]);
