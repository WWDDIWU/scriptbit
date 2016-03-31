import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'

import {BitComponent} from './bit.component'

@Component({
    selector: 'scriptbit',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    {
        path: '/:lang/:slug',
        name: 'Bit',
        component: BitComponent
    }
])
export class RouterComponent {
    
}