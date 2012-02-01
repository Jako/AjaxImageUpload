(function($) {
	$.fn.ajaxFileUpload = function(options) {
		var settings = $.extend({
			debug : false,
			uploadAction : '',
			uid : '',
			uploadTemplate : '<div class="qq-uploader"><div class="qq-upload-drop-area"><span>Drop files here to upload</span></div><div class="qq-upload-button">Upload a file</div><ul class="qq-upload-list"></ul></div>',
			fileTemplate : '<li><span class="qq-upload-file"></span><span class="qq-upload-spinner"></span><span class="qq-upload-size"></span><a class="qq-upload-cancel" href="#">Cancel</a><span class="qq-upload-failed-text">Failed</span></li>',
			deleteTemplate : '<div class="delete-button">Delete image</div>',
			clearTemplate : '<div class="qq-clear-button">Delete all images</div>',
			thumbX : '100px',
			thumbY : '100px',
			allowedExtensions : [],
			sizeLimit : 0,
			messages : {
				typeError : "{file} has invalid extension. Only {extensions} are allowed.",
				sizeError : "{file} is too large, maximum file size is {sizeLimit}.",
				minSizeError : "{file} is too small, minimum file size is {minSizeLimit}.",
				emptyError : "{file} is empty, please select files again without it.",
				onLeave : "The files are being uploaded, if you leave now the upload will be cancelled."
			}
		}, options);

		return this.each(function() {
			var element = $(this);
			var imageList = element.find('.file-uploader-images');
			var uploader = new qq.FileUploader({
				element : element.find('.file-uploader-buttons')[0],
				action : settings.uploadAction,
				params : {
					uid : settings.uid
				},
				template : settings.uploadTemplate,
				fileTemplate : settings.fileTemplate,
				allowedExtensions : settings.allowedExtensions,
				sizeLimit : settings.sizeLimit,
				messages : settings.messages,
				onComplete : function(id, fileName, uploadAnswer) {
					var fileid = uploadAnswer.fileid;
					if(uploadAnswer.success) {
						var imageWrap = $('<div>').addClass('image-wrap').addClass('image' + fileid);
						var deleteButton = $(settings.deleteTemplate).click(function() {
							$.get(settings.uploadAction, {
								'delete' : fileid
							}, function(deleteAnswer) {
								if(deleteAnswer.success) {
									imageWrap.fadeOut(function() {
										$(this).remove();
									});
									if(settings.debug) {
										alert(JSON.stringify(deleteAnswer) + '\nImage ' + fileid + ' deleted.');
									}
								}
							}, 'json');
						});
						var image = $('<img>').attr({
							src : uploadAnswer.filename
						}).css({
							width : settings.thumbX,
							height : settings.thumbY,
							position : 'relative'
						}).after(deleteButton);

						imageList.append(imageWrap.append(image));
						element.find('.qq-upload-list li').eq(id).hide();
						if(settings.debug) {
							alert('ID:' + id + '\nResponse:' + JSON.stringify(uploadAnswer));
						}
					}
				}
			});
			var clearButton = $(settings.clearTemplate).click(function() {
				$.get(settings.uploadAction, {
					'delete' : "all"
				}, function(clearAnswer) {
					if(clearAnswer.success) {
						imageList.empty();
						element.find('.qq-upload-list li').remove();
						if(settings.debug) {
							alert(JSON.stringify(deleteAnswer) + '\nAll Images deleted.');
						}
					}
				}, 'json');
			});
			imageList.find('.image-wrap .delete-button').click(function() {
				var imageWrap = $(this).parent();
				var imageClasses = imageWrap.attr("class").split(/\s+/);
				for( i = 0; i < imageClasses.length; i++) {
					var fileid = imageClasses[i].split("image")[1];
					if($.isNumeric(fileid)) {
						$.get(settings.uploadAction, {
							'delete' : fileid,
							'uid' : settings.uid
						}, function(deleteAnswer) {
							if(deleteAnswer.success) {
								imageWrap.fadeOut(function() {
									$(this).remove();
								});
								if(settings.debug) {
									alert(JSON.stringify(deleteAnswer) + '\nImage ' + fileid + ' deleted.');
								}
							}
						}, 'json');
					}
				}
			});
			element.find('.qq-upload-button').after(clearButton);
		});
	};
})(jQuery);
