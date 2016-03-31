import {Component, OnInit} from 'angular2/core'
import {RouteParams, RouterLink} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'

import {Script} from './script'
import {BitService} from './bit.service'

@Component({
    selector: 'bit',
    templateUrl: 'app/bit.component.html',
    providers: [HTTP_PROVIDERS, BitService],
    directives: [RouterLink]
})
export class BitComponent implements OnInit {
    script: Script;
    language: string;
    slug: string;
    formattedSource: string;
    constructor(private _routeParams: RouteParams, private _bitService: BitService) {
        this.script = new Script('', '', '');
        this.language = this._routeParams.get('lang');
        this.slug = this._routeParams.get('slug');
        this.formattedSource = '';
    }
    ngOnInit() {
       this.getBit();
    }
    getBit() {
        this._bitService.getBit(this.language, this._routeParams.get('slug')).subscribe(
            script => this.script = script,
            error => <any>error,
            () => this.formattedSource = hljs.highlight(this.language, this.script.source)
        );
    }
}
