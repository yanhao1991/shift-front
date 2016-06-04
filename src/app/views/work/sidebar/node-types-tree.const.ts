
export interface INodeTypeLeaf {
  key: string;
  label: string;
  index: number;
  sub?: INodeTypeLeaf[];
}

export const NODE_TYPES_TREE: INodeTypeLeaf[] = [
  {
    key: 'virtual',
    label: 'Virtual Nodes',
    index: 0,
    sub: [
      {
        key: 'logic',
        label: 'Logic Patches',
        index: 0,
        sub: [
          {
            key: 'and',
            label: 'AND',
            index: 0
          },
          {
            key: 'or',
            label: 'OR',
            index: 1
          },
          {
            key: 'not',
            label: 'NOT',
            index: 2
          },
          {
            key: 'conditional',
            label: 'Conditional',
            index: 3
          }
        ]
      },
      {
        key: 'control',
        label: 'Control Flow Patches',
        index: 1,
        sub: []
      },
      {
        key: 'operator',
        label: 'Operator Patches',
        index: 2,
        sub: [
          {
            key: 'arithmetic',
            label: 'Arithmetic',
            index: 0
          },
          {
            key: 'compound',
            label: 'Compound',
            index: 1
          },
          {
            key: 'bitwise',
            label: 'bitwise',
            index: 2
          }
        ]
      },
      {
        key: 'math',
        label: 'Math Patches',
        index: 3,
        sub: []
      },
      {
        key: 'utility',
        label: 'Utility Patches',
        index: 4,
        sub: []
      },
      {
        key: 'data',
        label: 'Data Patches',
        index: 5,
        sub: []
      }
    ]
  },
  {
    key: 'device',
    label: 'Device Nodes',
    index: 1,
    sub: [
      {
        key: 'switch',
        label: 'Switchs',
        index: 0,
        sub: [
          {
            key: 'snap',
            label: 'Switch',
            index: 0
          }
        ]
      }, {
        key: 'module',
        label: 'Modules',
        index: 0,
        sub: [
          {
            key: 'rgb',
            label: 'RGB',
            index: 0
          }, {
            key: 'servo',
            label: 'Servo',
            index: 0
          }
        ]
      }
    ]
  }
];