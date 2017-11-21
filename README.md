# THIS PROJECT IS DEPRECATED

AjaxImageUpload is not maintained anymore. It maybe does not work in Evolution 1.1 anymore. Please fork it and bring it back to life, if you need it.

AjaxImageUpload
================================================================================

MODX Snippet/jQuery Script Wrapper for Andrew Valums great file upload script (previous on ~~http://valums.com/ajax-upload/~~)

Features:
--------------------------------------------------------------------------------
With this snippet an upload button for uploading multiple files with progress-bar is generated. Works well in FF3.6+, Safari4+, Chrome and falls back to hidden iframe based upload in other browsers, providing good user experience everywhere.

Installation:
--------------------------------------------------------------------------------
1. Upload all files into the new folder *assets/snippets/ajaximageupload*
2. Create a new snippet called AjaxImageUpload with the following snippet code
    `<?php
    return include MODX_BASE_PATH.'assets/snippets/ajaximageupload/ajaximageupload.snippet.php';
    ?>`

Usage
--------------------------------------------------------------------------------

- Non Ajax Page: 
```
[!AjaxImageUpload? &mode=`form` &ajaxId=`779` &uid=`uniqueid` &language=`german` &allowedExtensions=`jpg,jpeg,png,gif` &thumbX=`75` &thumbY=`75`!]
```
- AJAX page: 
```
[!AjaxImageUpload? &mode=`ajax` &language=`german` &allowedExtensions=`jpg,jpeg,png,gif` &maxFilesizeMb=`2` &thumbX=`100` &thumbY=`100`!]
```

Parameters
--------------------------------------------------------------------------------

Property | Description | Default
---- | ----------- | -------
mode | Snippet mode | form
formUid | Unique form Id |  md5 of MODX 'site_url' setting
language | Snippet language | english
allowedExtensions | Allowed file extensions for upload | jpg,jpeg,png,gif
maxFilesizeMb | Maximum size for one file to upload | 8
maxFiles | Maximum count of files to upload | 3
thumbX | horizontal size of generated thumb | 100 
thumbY | vertical size of generated thumb | 100 
ajaxId | id of the document with the ajax snippet call | 0
addJquery | add jQuery script in head | 1
addJscript | add the snippet javascript and the fileuploader script in head | 1
addCss | add the snippet css in head | 1


Notes:
--------------------------------------------------------------------------------
1. The uploaded images will be saved with an unique filename in `assets/cache/ajaximageupload`. This folder should be cleaned from time to time.
2. The properties of the uploaded images will be saved in `$_SESSION['AjaxImageUpload'][$uid][$id]` as `array('originalName', 'uniqueName', 'thumbName', 'path')` and should be moved from there during the other form process. The parameter `$uid` should be set on non ajax page with the parameter `formUid`, `$id` is the number of the image.
3. The parameter `formUid` could be generated and set for each upload button (to separate multiple upload queues) and maybe each pageview (to separate uploads for the same queue and session but i.e. in different browser tabs).
4. Different upload buttons could use different ajax 'documents' for allowing different file types, thumb sizes etc.
