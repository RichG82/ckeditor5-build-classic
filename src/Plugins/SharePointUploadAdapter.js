import {
	Web
} from "sp-pnp-js";
import pnp from "sp-pnp-js";

export default class SharePointUploadAdapter {

	constructor(loader, spSiteUrl, spLibrary) {
		this.loader = loader;
		this.spSiteUrl = spSiteUrl;
		this.spLibrary = spLibrary;
	}

	upload() {

		pnp.setup({
			sp: {
				baseUrl: this.spSiteUrl
			}
		});

		let relativeUrl = this.getUrlParts(this.spSiteUrl).pathname;
		let relativeLibraryPath = relativeUrl + "/" + this.spLibrary;
		let urlParts = this.getUrlParts(this.spSiteUrl);

		return new Promise((resolve, reject) => {
			let web = new Web(this.spSiteUrl);
			let file = this.loader.file;
			web.getFolderByServerRelativeUrl(relativeLibraryPath).files.add(file.name, file, true).then(function (fileInfo) {
				// console.log(JSON.stringify(fileInfo, null, 4));
				let absolutePath = urlParts.protocol + "//" + urlParts.hostname;
				let absoluteImagePath = absolutePath + fileInfo.data.ServerRelativeUrl;
				console.log("Added image: " + absoluteImagePath);
				resolve({
					default: absoluteImagePath
				});
			}).catch(err => {
				reject(err);
			});
		});
	}

	abort() {}


	getUrlParts(url) {
		var a = document.createElement('a');
		a.href = url;

		return {
			href: a.href,
			host: a.host,
			hostname: a.hostname,
			port: a.port,
			pathname: a.pathname,
			protocol: a.protocol,
			hash: a.hash,
			search: a.search
		};
	}
}
