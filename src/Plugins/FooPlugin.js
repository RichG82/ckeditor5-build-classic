import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Foo extends Plugin {
    init() {
        console.log( 'Foo was initialized' );
    }
}