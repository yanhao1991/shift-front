/// <reference path="../../typings/main.d.ts" />
/// <reference path="./index.d.ts" />


import { config } from './index.config.ts';
import { routerConfig } from './index.route.ts';
import { runBlock } from './index.run.ts';
// ---------------------------------------------------------------------------
import { NODE_TYPES_TREE } from './views/work/sidebar/node-types-tree.const.ts';
// ---------------------------------------------------------------------------
import { NodeHandlerService } from './components/node/handlers/handler.service.ts';
import { ApiService } from './components/api/api.service.ts';
// ---------------------------------------------------------------------------
import { MainController } from './views/main/main.controller.ts';
import { WorkController } from './views/work/work.controller.ts';
import { SidebarController } from './views/work/sidebar/sidebar.controller.ts';
import { SketchpadController } from './views/work/sketchpad/sketchpad.controller.ts';
import { CodeboxController } from './views/work/codebox/codebox.controller.ts';
// ---------------------------------------------------------------------------
import { shiftNode } from './components/node/node.directive.ts';
import { rightClick } from './components/right-click/right-click.directive.ts';
import { sortInputFilter } from './components/sort-input-filter/sort-input.filter.ts';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module shiftFront {
  'use strict';

  let depns = ['ngAnimate',
               'ngCookies',
               'ngTouch',
               'ngSanitize',
               'ngMessages',
               'ngAria',
               'ngResource',
               'ui.router',
               'ui.bootstrap',
               'toastr',
               'ang-drag-drop',
               'ui.ace',
               'ui.bootstrap.contextMenu'];

  angular.module('shiftFront', depns)
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)

    .constant('NODE_TYPES_TREE', NODE_TYPES_TREE)
    .filter('sortInputFilter', sortInputFilter)

    .service('nodeHandlerService', NodeHandlerService)
    .service('apiService', ApiService)

    .directive('shiftNode', shiftNode)
    .directive('rightClick', rightClick)

    .controller('MainController', MainController)
    .controller('WorkController', WorkController)
    .controller('SidebarController', SidebarController)
    .controller('SketchpadController', SketchpadController)
    .controller('CodeboxController', CodeboxController)
    ;
}
