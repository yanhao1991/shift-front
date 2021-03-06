'use strict';
import * as _ from 'lodash';

type INode = shift.node.INode;
type INodeType = shift.node.INodeType;
type INodeInput = shift.node.INodeInput;
type IWorkScope = shift.views.work.IWorkScope;

declare let jsPlumb: any;

export class SketchpadController {

  public jsPlumbInstance: any;
  public model: INode[];
  public nodeActions: any;

  /* @ngInject */
  constructor(
    private $log: angular.ILogService,
    private $scope: { $parent: IWorkScope }) {

    this.model = $scope.$parent.model;
    this.nodeActions = {
      onEdit: (node: INode) => {
        $log.debug('TODO: edit', node);
      },
      onDelete: (node: INode) => {
        _.pull(this.model, node);
      }
    };

    this.bind();
  }

  bind() {

    jsPlumb.bind('ready', () => {
      this.$log.debug('jsplumb ready');
      // 新建jsplumb实例
      var instance = jsPlumb.getInstance({
        Connector: ['Bezier', { curviness: 50 }],
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { strokeStyle: '#2EFDF6', lineWidth: 1 },
        EndpointStyle: {
          radius: 3
        },
        HoverPaintStyle: { strokeStyle: '#7073EB' },
        EndpointHoverStyle: { fillStyle: '#7073EB' },
        Container: 'sketchpad_desk'
      });
      this.jsPlumbInstance = instance;

      // 绑定
      instance.bind('connection', this.onConnectionEstablishedFactory(this));
      instance.bind('connectionDetached', this.onConnectionDetachedFactory(this));
      instance.bind('connectionMoved', this.onConnectionMovedFactory(this));

    });
  }

  onDrop(event: any, data: INodeType) {
    // this.$log.debug(event, data);

    this.model.push({
      id: 'TMP' + (new Date()).getTime(),
      type: data,
      operation: undefined,
      address: undefined,
      label: data.tertiaryLabel,
      position: {
        x: event.originalEvent.offsetX,
        y: event.originalEvent.offsetY
      },
      inputs: [],
      outputs: []
    });

  }

  onConnectionEstablishedFactory(context: SketchpadController) {
    return function (conn: any, event: MouseEvent) {
      context.$log.debug('connection established');

      let source = context.parseEndpoint(conn.sourceEndpoint.getUuid());
      let target = context.parseEndpoint(conn.targetEndpoint.getUuid());
      context.$log.debug(source, target);
      context.establishedConn(source, target, context.model, conn.connection);
    };
  }

  onConnectionDetachedFactory(context: SketchpadController) {
    return function (conn: any, event: MouseEvent) {
      context.$log.debug('connection detached');

      let source = context.parseEndpoint(conn.sourceEndpoint.getUuid());
      let target = context.parseEndpoint(conn.targetEndpoint.getUuid());
      context.$log.debug(source, target);
      context.detachConn(source, target, context.model, conn.connection);
    };
  }

  onConnectionMovedFactory(context: SketchpadController) {
    return function (conn: any, event: MouseEvent) {
      context.$log.debug('connection moved', conn);

      let originalSource = context.parseEndpoint(conn.originalSourceEndpoint.getUuid());
      let originalTarget = context.parseEndpoint(conn.originalTargetEndpoint.getUuid());
      context.$log.debug(originalSource, originalTarget);
      context.detachConn(originalSource, originalTarget, context.model, conn.connection);

      let newSource = context.parseEndpoint(conn.newSourceEndpoint.getUuid());
      let newTarget = context.parseEndpoint(conn.newTargetEndpoint.getUuid());
      context.$log.debug(newSource, newTarget);
      context.establishedConn(newSource, newTarget, context.model, conn.connection);

    };
  }

  parseEndpoint(uuid: string): IEndpoint {
    let uuidArr = uuid.split('-');
    return {
      id: uuidArr[0],
      portType: uuidArr[1],
      portIndex: uuidArr[2],
      portSubIndex: uuidArr[3]
    };
  }

  detachConn(source: IEndpoint, target: IEndpoint, model: INode[], connection: any) {
      // let sourceModal = _.find(model, (item: INode) => { return item.id === source.id; });
      let targetModal = _.find(model, (item: INode) => { return item.id === target.id; });
      // context.$log.debug(sourceModal, targetModal);

      /* tslint:disable */
      let targetInput = this.findInput(targetModal.inputs, target);
      // context.$log.debug(targetInput);

      if (targetInput._connId != connection.id) {
        return;
      }

      // 清除连接
      targetInput.type = undefined;
      targetInput.refId = undefined;
      targetInput.refOutputPort = undefined;
      targetInput._connId = undefined;
  }

  establishedConn(source: IEndpoint, target: IEndpoint, model: INode[], connection: any) {
      let sourceModal = _.find(model, (item: INode) => { return item.id === source.id });
      let targetModal = _.find(model, (item: INode) => { return item.id === target.id; });
      // context.$log.debug(sourceModal, targetModal);

      /* tslint:disable */
      let targetInput = this.findInput(targetModal.inputs, target);
      // context.$log.debug(targetInput);

      if (targetInput._connId) {
        if (targetInput._connId == connection.id) {
          return;
        } else {
          jsPlumb.detach(connection);
          return;
        }
      }

      // 建立连接
      targetInput.type = 'ref';
      targetInput.refId = source.id;
      targetInput.refOutputPort = source.portIndex;
      targetInput._connId = connection.id;
  }

  findInput(inputs: shift.node.INodeInput[], endpoint: IEndpoint): shift.node.INodeInput {
    // debugger;
    let input = _.find(inputs, (input: INodeInput) => input.port == endpoint.portIndex);
    if (endpoint.portSubIndex === undefined) {
      return input;
    }
    return _.find(input.sub, (input: INodeInput) => input.port == endpoint.portSubIndex);
  }


}

interface IEndpoint {
  id: string;
  portType: string;
  portIndex: string | number;
  portSubIndex: string | number;
}
