const mix = require("laravel-mix");

mix
	.combine(['src/notification.js','src/app.js','src/customizer.js','src/ajax.js','src/setting.js'],'dist/app.js')
	.postCss("src/app.css", "dist", [require("tailwindcss")]);
