import React, { Component } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst'


export default class Sunburst extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div>

      <ResponsiveSunburst
        root={dummyData}
        m
        identity="name"
        value="loc"
        cornerRadius={3}
        borderWidth={1}
        borderColor="white"
        colors="nivo"
        colorBy="id"
        childColor="inherit"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
    />
    </div>
    )
  }
}



let dummyData = {
  "name": "nivo",
  "color": "hsl(348, 70%, 50%)",
  "children": [
    {
      "name": "viz",
      "color": "hsl(74, 70%, 50%)",
      "children": [
        {
          "name": "stack",
          "color": "hsl(198, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(210, 70%, 50%)",
              "loc": 85551
            },
            {
              "name": "xAxis",
              "color": "hsl(122, 70%, 50%)",
              "loc": 174133
            },
            {
              "name": "yAxis",
              "color": "hsl(9, 70%, 50%)",
              "loc": 100162
            },
            {
              "name": "layers",
              "color": "hsl(47, 70%, 50%)",
              "loc": 101743
            }
          ]
        },
        {
          "name": "pie",
          "color": "hsl(76, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(198, 70%, 50%)",
              "children": [
                {
                  "name": "pie",
                  "color": "hsl(12, 70%, 50%)",
                  "children": [
                    {
                      "name": "outline",
                      "color": "hsl(101, 70%, 50%)",
                      "loc": 130519
                    },
                    {
                      "name": "slices",
                      "color": "hsl(95, 70%, 50%)",
                      "loc": 77897
                    },
                    {
                      "name": "bbox",
                      "color": "hsl(282, 70%, 50%)",
                      "loc": 11598
                    }
                  ]
                },
                {
                  "name": "donut",
                  "color": "hsl(151, 70%, 50%)",
                  "loc": 80348
                },
                {
                  "name": "gauge",
                  "color": "hsl(140, 70%, 50%)",
                  "loc": 186809
                }
              ]
            },
            {
              "name": "legends",
              "color": "hsl(185, 70%, 50%)",
              "loc": 129402
            }
          ]
        }
      ]
    },
    {
      "name": "colors",
      "color": "hsl(167, 70%, 50%)",
      "children": [
        {
          "name": "rgb",
          "color": "hsl(133, 70%, 50%)",
          "loc": 194702
        },
        {
          "name": "hsl",
          "color": "hsl(196, 70%, 50%)",
          "loc": 181497
        }
      ]
    },
    {
      "name": "utils",
      "color": "hsl(293, 70%, 50%)",
      "children": [
        {
          "name": "randomize",
          "color": "hsl(93, 70%, 50%)",
          "loc": 24443
        },
        {
          "name": "resetClock",
          "color": "hsl(133, 70%, 50%)",
          "loc": 27953
        },
        {
          "name": "noop",
          "color": "hsl(355, 70%, 50%)",
          "loc": 116507
        },
        {
          "name": "tick",
          "color": "hsl(224, 70%, 50%)",
          "loc": 114671
        },
        {
          "name": "forceGC",
          "color": "hsl(147, 70%, 50%)",
          "loc": 167361
        },
        {
          "name": "stackTrace",
          "color": "hsl(327, 70%, 50%)",
          "loc": 34970
        },
        {
          "name": "dbg",
          "color": "hsl(61, 70%, 50%)",
          "loc": 66809
        }
      ]
    },
    {
      "name": "generators",
      "color": "hsl(280, 70%, 50%)",
      "children": [
        {
          "name": "address",
          "color": "hsl(48, 70%, 50%)",
          "loc": 78085
        },
        {
          "name": "city",
          "color": "hsl(276, 70%, 50%)",
          "loc": 121312
        },
        {
          "name": "animal",
          "color": "hsl(213, 70%, 50%)",
          "loc": 87590
        },
        {
          "name": "movie",
          "color": "hsl(64, 70%, 50%)",
          "loc": 196065
        },
        {
          "name": "user",
          "color": "hsl(201, 70%, 50%)",
          "loc": 6647
        }
      ]
    },
    {
      "name": "set",
      "color": "hsl(312, 70%, 50%)",
      "children": [
        {
          "name": "clone",
          "color": "hsl(25, 70%, 50%)",
          "loc": 187349
        },
        {
          "name": "intersect",
          "color": "hsl(37, 70%, 50%)",
          "loc": 198792
        },
        {
          "name": "merge",
          "color": "hsl(335, 70%, 50%)",
          "loc": 100585
        },
        {
          "name": "reverse",
          "color": "hsl(108, 70%, 50%)",
          "loc": 123945
        },
        {
          "name": "toArray",
          "color": "hsl(295, 70%, 50%)",
          "loc": 3709
        },
        {
          "name": "toObject",
          "color": "hsl(138, 70%, 50%)",
          "loc": 49431
        },
        {
          "name": "fromCSV",
          "color": "hsl(318, 70%, 50%)",
          "loc": 180160
        },
        {
          "name": "slice",
          "color": "hsl(240, 70%, 50%)",
          "loc": 39832
        },
        {
          "name": "append",
          "color": "hsl(340, 70%, 50%)",
          "loc": 163623
        },
        {
          "name": "prepend",
          "color": "hsl(62, 70%, 50%)",
          "loc": 80219
        },
        {
          "name": "shuffle",
          "color": "hsl(320, 70%, 50%)",
          "loc": 38391
        },
        {
          "name": "pick",
          "color": "hsl(145, 70%, 50%)",
          "loc": 153974
        },
        {
          "name": "plouc",
          "color": "hsl(318, 70%, 50%)",
          "loc": 196757
        }
      ]
    },
    {
      "name": "text",
      "color": "hsl(59, 70%, 50%)",
      "children": [
        {
          "name": "trim",
          "color": "hsl(204, 70%, 50%)",
          "loc": 133008
        },
        {
          "name": "slugify",
          "color": "hsl(178, 70%, 50%)",
          "loc": 216
        },
        {
          "name": "snakeCase",
          "color": "hsl(356, 70%, 50%)",
          "loc": 198419
        },
        {
          "name": "camelCase",
          "color": "hsl(346, 70%, 50%)",
          "loc": 197744
        },
        {
          "name": "repeat",
          "color": "hsl(202, 70%, 50%)",
          "loc": 154457
        },
        {
          "name": "padLeft",
          "color": "hsl(168, 70%, 50%)",
          "loc": 112715
        },
        {
          "name": "padRight",
          "color": "hsl(335, 70%, 50%)",
          "loc": 197638
        },
        {
          "name": "sanitize",
          "color": "hsl(304, 70%, 50%)",
          "loc": 55454
        },
        {
          "name": "ploucify",
          "color": "hsl(291, 70%, 50%)",
          "loc": 10319
        }
      ]
    },
    {
      "name": "misc",
      "color": "hsl(179, 70%, 50%)",
      "children": [
        {
          "name": "whatever",
          "color": "hsl(335, 70%, 50%)",
          "children": [
            {
              "name": "hey",
              "color": "hsl(173, 70%, 50%)",
              "loc": 70004
            },
            {
              "name": "WTF",
              "color": "hsl(296, 70%, 50%)",
              "loc": 149891
            },
            {
              "name": "lol",
              "color": "hsl(329, 70%, 50%)",
              "loc": 152746
            },
            {
              "name": "IMHO",
              "color": "hsl(3, 70%, 50%)",
              "loc": 13589
            }
          ]
        },
        {
          "name": "other",
          "color": "hsl(27, 70%, 50%)",
          "loc": 173434
        },
        {
          "name": "crap",
          "color": "hsl(339, 70%, 50%)",
          "children": [
            {
              "name": "crapA",
              "color": "hsl(72, 70%, 50%)",
              "loc": 139960
            },
            {
              "name": "crapB",
              "color": "hsl(98, 70%, 50%)",
              "children": [
                {
                  "name": "crapB1",
                  "color": "hsl(74, 70%, 50%)",
                  "loc": 84920
                },
                {
                  "name": "crapB2",
                  "color": "hsl(278, 70%, 50%)",
                  "loc": 88557
                },
                {
                  "name": "crapB3",
                  "color": "hsl(155, 70%, 50%)",
                  "loc": 65126
                },
                {
                  "name": "crapB4",
                  "color": "hsl(357, 70%, 50%)",
                  "loc": 178776
                }
              ]
            },
            {
              "name": "crapC",
              "color": "hsl(96, 70%, 50%)",
              "children": [
                {
                  "name": "crapC1",
                  "color": "hsl(186, 70%, 50%)",
                  "loc": 8210
                },
                {
                  "name": "crapC2",
                  "color": "hsl(169, 70%, 50%)",
                  "loc": 54681
                },
                {
                  "name": "crapC3",
                  "color": "hsl(317, 70%, 50%)",
                  "loc": 106747
                },
                {
                  "name": "crapC4",
                  "color": "hsl(126, 70%, 50%)",
                  "loc": 102665
                },
                {
                  "name": "crapC5",
                  "color": "hsl(177, 70%, 50%)",
                  "loc": 125104
                },
                {
                  "name": "crapC6",
                  "color": "hsl(6, 70%, 50%)",
                  "loc": 26316
                },
                {
                  "name": "crapC7",
                  "color": "hsl(325, 70%, 50%)",
                  "loc": 61650
                },
                {
                  "name": "crapC8",
                  "color": "hsl(72, 70%, 50%)",
                  "loc": 164158
                },
                {
                  "name": "crapC9",
                  "color": "hsl(44, 70%, 50%)",
                  "loc": 55314
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

