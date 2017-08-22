To create custom plugin in Ionic App
==============

Install plugman

```bash
npm install plugman -g
```

Install plugin to display message

```bash
ionic cordova plugin add cordova-plugin-x-toast
```

Create new plugin inside plugins folder

```bash
cd plugins
Create Custom plugin : plugman create --name customPlugin --plugin_id cordova_plugin_custom --plugin_version 0.0.1
```

Add android platform for plugin

```bash
cd customPlugin
plugman platform add --platform_name android
```

Create package.json file for custom plugin

```bash
plugman createpackagejson .
```

Then run:

```bash
ionic cordova plugin add .
```
