import type { Direction, Group, Node, ResponsiveMode } from './type'

const getScreenSize = (responsiveMode: ResponsiveMode) =>
  responsiveMode === 'small' ? '0px' : '768px'

const generatePosition = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].position

      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    return current
      ? acc +
          `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:position-${current} {
        position: ${current};
      }
    }
    `
      : ''
  }, '')
}

const generateCrossAxis = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].crossAxis

      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    return current
      ? acc +
          `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:crossAxis-${current} {
        align-items: ${current};
      }
    }
    `
      : ''
  }, '')
}

const generateMainAxis = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].mainAxis

      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    return current
      ? acc +
          `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:mainAxis-${current} {
        justify-content: ${current === 'between' ? 'space-between' : current};
      }
    }
    `
      : ''
  }, '')
}

const generateTransparent = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: boolean[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <boolean | undefined>node.layout[responsiveMode].transparent

      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    return current
      ? acc +
          `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:transparent {
        background: #ffffff;
      }
    }
    `
      : ''
  }, '')
}

const generateHidden = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: boolean[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <boolean | undefined>node.layout[responsiveMode].hidden

      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)
  const query =
    responsiveMode === 'small'
      ? `(min-width:${getScreenSize('small')}) and (max-width:${getScreenSize(
          'large'
        )})`
      : `min-width: ${getScreenSize(responsiveMode)}`
  return result.reduce((acc, current) => {
    return current
      ? acc +
          `
    @media(${query}) {
      .${responsiveMode}\\:hidden-${current} {
          display: none;
      }
    }
    `
      : ''
  }, '')
}

const generateFlexDirection = (
  nodes: Node[],
  responsiveMode: ResponsiveMode
) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].direction
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce(
    (acc, current) =>
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:direction-${current} {
        flex-direction: ${current === 'horizontal' ? 'row' : 'column'};
      }
    }
    `,
    ''
  )
}

const generateDisplayType = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].type
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce(
    (acc, current) =>
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:type-${current} {
        display: ${current === 'stack' ? 'flex' : 'grid'};
      }
    }
    `,
    ''
  )
}

const generateGap = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].gap
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce(
    (acc, current) =>
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:gap-${current} {
        gap: ${current};
      }
    }
    `,
    ''
  )
}

const generateColumns = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].columns
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce(
    (acc, current) =>
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:columns-${current} {
        grid-template-columns: repeat(${current}, 1fr);
      }
    }
    `,
    ''
  )
}

const generateWidth = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].width
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')
    return (
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:width-${convertedCurrent} {
        width: ${current};
      }
    }
    `
    )
  }, '')
}

const generateHeight = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].height
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return (
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:height-${convertedCurrent} {
        height: ${current};
      }
    }
    `
    )
  }, '')
}

const generateZIndex = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].zIndex
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    return (
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:zIndex-${current} {
      z-index: ${current};
      }
    }
    `
    )
  }, '')
}

const generateMaxWidth = (nodes: Node[], responsiveMode: ResponsiveMode) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode].maxWidth
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return (
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:maxWidth-${convertedCurrent} {
        max-width: ${current};
      }
    }
    `
    )
  }, '')
}

const generatePadding = (
  nodes: Node[],
  responsiveMode: ResponsiveMode,
  direction: Direction
) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>(
        node.layout[responsiveMode][directionToPaddingField(direction)]
      )
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return (
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:${flatCapital(
        directionToPaddingField(direction)
      )}-${convertedCurrent} {
        ${flatCapital(directionToPaddingField(direction))}: ${current};
      }
    }
    `
    )
  }, '')
}

const generateInset = (
  nodes: Node[],
  responsiveMode: ResponsiveMode,
  direction: Direction
) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.layout[responsiveMode][direction]
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return result.reduce((acc, current) => {
    const convertedCurrent = current.replace('%', '\\%')

    return (
      acc +
      `
    @media(min-width: ${getScreenSize(responsiveMode)}) {
      .${responsiveMode}\\:${direction}-${convertedCurrent} {
        ${direction}: ${current};
      }
    }
    `
    )
  }, '')
}

const directionToPaddingField = (direction: Direction) =>
  direction === 'left'
    ? 'paddingLeft'
    : direction === 'right'
    ? 'paddingRight'
    : direction === 'top'
    ? 'paddingTop'
    : 'paddingBottom'

const flatCapital = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

const generateCoreCss = () => {
  return `
        .icon {
          display: inline-block;
          width: 1em;
          height: 1em;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          background-color: currentColor;
        }  
          
        .node {
          width: 100%;
          border-collapse: collapse;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: start;
        }
        
        .node > * {
          width: 100%;
        }
        `
}

const generateLayoutCss = (nodes: Node[]) => {
  return (
    generatePosition(nodes, 'small') +
    generatePosition(nodes, 'large') +
    generateCrossAxis(nodes, 'small') +
    generateCrossAxis(nodes, 'large') +
    generateMainAxis(nodes, 'small') +
    generateMainAxis(nodes, 'large') +
    generateTransparent(nodes, 'small') +
    generateTransparent(nodes, 'large') +
    generateHidden(nodes, 'small') +
    generateHidden(nodes, 'large') +
    generateFlexDirection(nodes, 'small') +
    generateFlexDirection(nodes, 'large') +
    generateDisplayType(nodes, 'small') +
    generateDisplayType(nodes, 'large') +
    generateGap(nodes, 'small') +
    generateGap(nodes, 'large') +
    generateColumns(nodes, 'small') +
    generateColumns(nodes, 'large') +
    generateWidth(nodes, 'small') +
    generateWidth(nodes, 'large') +
    generateHeight(nodes, 'small') +
    generateHeight(nodes, 'large') +
    generateZIndex(nodes, 'small') +
    generateZIndex(nodes, 'large') +
    generateMaxWidth(nodes, 'small') +
    generateMaxWidth(nodes, 'large') +
    generatePadding(nodes, 'small', 'left') +
    generatePadding(nodes, 'small', 'top') +
    generatePadding(nodes, 'small', 'right') +
    generatePadding(nodes, 'small', 'bottom') +
    generatePadding(nodes, 'large', 'left') +
    generatePadding(nodes, 'large', 'top') +
    generatePadding(nodes, 'large', 'right') +
    generatePadding(nodes, 'large', 'bottom') +
    generateInset(nodes, 'small', 'left') +
    generateInset(nodes, 'small', 'top') +
    generateInset(nodes, 'small', 'right') +
    generateInset(nodes, 'small', 'bottom') +
    generateInset(nodes, 'large', 'left') +
    generateInset(nodes, 'large', 'top') +
    generateInset(nodes, 'large', 'right') +
    generateInset(nodes, 'large', 'bottom')
  )
}

const generateWidgetCss = (nodes: Node[], groups: Group[]) => {
  const result: string[] = []

  const recursive = (nodes: Node[]) => {
    nodes?.forEach((node) => {
      const value = <string | undefined>node.widget?.id
      if (value && !result.includes(value)) result.push(value)
      recursive(node.nodes)
    })
  }

  recursive(nodes)

  return groups
    .flatMap((group) => group.items)
    .filter((item) => item.id && result.includes(item.id))
    .reduce((acc, current) => {
      const newline = acc ? '\n\n' : ''
      return acc + newline + current.css
    }, '')
}

export const generateCss = (nodes: Node[], groups: Group[]) => {
  return (
    generateCoreCss() +
    generateLayoutCss(nodes) +
    generateWidgetCss(nodes, groups)
  )
}

const generateNodeCss = (node: Node) => {
  return (<ResponsiveMode[]>Object.keys(node.layout)).reduce<string>(
    (acc, current) => {
      let result = ''
      if (node.layout[current].transparent)
        result = result + `${current}:transparent `
      if (node.layout[current].type === 'grid')
        result = result + `${current}:type-${node.layout[current].type} `
      if (node.layout[current].direction === 'horizontal')
        result =
          result + `${current}:direction-${node.layout[current].direction} `
      if (node.layout[current].columns)
        result = result + `${current}:columns-${node.layout[current].columns} `
      if (node.layout[current].gap)
        result = result + `${current}:gap-${node.layout[current].gap} `
      if (node.layout[current].width)
        result = result + `${current}:width-${node.layout[current].width} `
      if (node.layout[current].height)
        result = result + `${current}:height-${node.layout[current].height} `
      if (node.layout[current].maxWidth)
        result =
          result + `${current}:maxWidth-${node.layout[current].maxWidth} `

      if (node.layout[current].mainAxis !== undefined)
        result =
          result + `${current}:mainAxis-${node.layout[current].mainAxis} `

      if (node.layout[current].crossAxis !== undefined)
        result =
          result + `${current}:crossAxis-${node.layout[current].crossAxis} `

      if (node.layout[current].position !== undefined)
        result =
          result + `${current}:position-${node.layout[current].position} `

      if (node.layout[current].zIndex !== undefined)
        result = result + `${current}:zIndex-${node.layout[current].zIndex} `

      if (node.layout[current].hidden)
        result = result + `${current}:hidden-${node.layout[current].hidden} `

      if (node.layout[current].paddingLeft !== undefined)
        result =
          result +
          `${current}:padding-left-${node.layout[current].paddingLeft} `
      if (node.layout[current].paddingTop !== undefined)
        result =
          result + `${current}:padding-top-${node.layout[current].paddingTop} `
      if (node.layout[current].paddingRight !== undefined)
        result =
          result +
          `${current}:padding-right-${node.layout[current].paddingRight} `
      if (node.layout[current].paddingBottom !== undefined)
        result =
          result +
          `${current}:padding-bottom-${node.layout[current].paddingBottom} `

      if (node.layout[current].left !== undefined)
        result = result + `${current}:left-${node.layout[current].left} `
      if (node.layout[current].top !== undefined)
        result = result + `${current}:top-${node.layout[current].top} `
      if (node.layout[current].right !== undefined)
        result = result + `${current}:right-${node.layout[current].right} `
      if (node.layout[current].bottom !== undefined)
        result = result + `${current}:bottom-${node.layout[current].bottom} `

      return acc + result
    },
    ''
  )
}

export const generateHtml = (nodes: Node[]) => {
  let i18n: any

  try {
    i18n = useI18n()
  } catch (e) {
    console.warn('no installed i18n')
  }

  return nodes.reduce((acc, current) => {
    const classes = generateNodeCss(current)

    const html: string =
      current.nodes.length === 0 && !current.widget
        ? `<div class="node ${classes}"></div>`
        : current.widget?.html
        ? `<div class="node ${classes}">
                  ${(current.widget.instance || current.widget.html)
                    .replace(/\r|\n|\t/, '')
                    .replace(/{{(.*?)}}/g, (value) => {
                      const replaced = value.replace(/{|}/g, '')
                      return i18n?.t(replaced) ?? replaced
                    })}
              </div>`
        : `<div class="node ${classes}">${generateHtml(current.nodes)}</div>`

    return acc + html
  }, '')
}
