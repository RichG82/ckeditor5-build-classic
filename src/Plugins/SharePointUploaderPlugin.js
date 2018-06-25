import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

export default class SharePointUploader extends Plugin {
    static get pluginName() {
        return 'SharePointUploader';
    }

	static get requires() {
		return [ FileRepository ];
	}    

	init() {
		console.log("Initialized 'SharePointUploader' plugin.");
		debugger;
		const url = this.editor.config.get( 'sharePointUploader.uploadUrl' );

		if ( !url ) {
			return;
		}

		// Register CKFinderAdapter
		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => new UploadAdapter( loader, url, this.editor.t );
	}
}