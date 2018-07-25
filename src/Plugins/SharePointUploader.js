import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import SharePointUploadAdapter from './SharePointUploadAdapter';

export default class SharePointUploader extends Plugin {
    static get pluginName() {
        return 'SharePointUploader';
    }

	static get requires() {
		return [ FileRepository ];
	}    

	init() {
		console.log("Initialized 'SharePointUploader' plugin.");
		const spSiteUrl = this.editor.config.get( 'sharePointUploader.spSiteUrl' );
		const spLibrary = this.editor.config.get( 'sharePointUploader.spLibrary' );

		if ( !spSiteUrl ) {
			console.log('sharePointUploader.spSiteUrl was not found in the plugin configuration.');
			return;
		}

		// Register CKFinderAdapter
		this.editor.plugins.get( FileRepository ).createUploadAdapter = (loader) => {
			return new SharePointUploadAdapter( loader, spSiteUrl, spLibrary )
		}
	}
}
