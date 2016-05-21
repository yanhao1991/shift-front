import { AbstractHandler } from './../../abstract.handler.ts';
import { INodeType } from './../../../../../models/node.model.ts';
import { IHandlerContext } from '../../../handlers/handler-context.model.ts';

export class OrHandler extends AbstractHandler {

  public next: AbstractHandler;
  public type: INodeType;

  constructor() {
    super();

    this.type = {
      primary: 'virtual',
      secondary: 'logic',
      tertiary: 'or'
    };
  }

  doHandle(context: IHandlerContext): void {
    let { logger } = context;
    logger.debug('handler or node');

    this.addEndPoints(context);
  }

  addEndPoints(context: IHandlerContext) {
    let { instance, elem, model } = context;

    // input port 1
    instance.addEndpoint(elem, {
      uuid: model.id + '-in-0',
      anchor: [0.1, 0.53, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: false,
      isTarget: true
    });
    // input port 2
    instance.addEndpoint(elem, {
      uuid: model.id + '-in-1',
      anchor: [0.1, 0.74, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: false,
      isTarget: true
    });
    // output port 1
    instance.addEndpoint(elem, {
      uuid: model.id + '-out-0',
      anchor: [0.9, 0.53, 0, 0],
      cssClass: 'NodePort',
      endpoint: 'Dot',
      maxConnections: -1,
      isSource: true,
      isTarget: false
    });
  }

}