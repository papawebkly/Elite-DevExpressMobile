window.Elite = $.extend(true, window.Elite, {
  "config": {
    "layoutSet": "slideout",
    "commandMapping": {
      "ios-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "locateInMenu": "always"
          },
          {
            "id": "menu-edit",
            "locateInMenu": "always"
          },
          {
            "id": "menu-remove",
            "locateInMenu": "always"
          }
        ]
      },
      "android-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "locateInMenu": "always"
          },
          {
            "id": "menu-edit",
            "locateInMenu": "always"
          },
          {
            "id": "menu-remove",
            "locateInMenu": "always"
          }
        ]
      },
      "win8-phone-appbar": {
        "commands": [
          {
            "id": "menu-add",
            "locateInMenu": "always"
          },
          {
            "id": "menu-edit",
            "locateInMenu": "always"
          },
          {
            "id": "menu-remove",
            "locateInMenu": "always"
          }
        ]
      },
      "win10-phone-appbar": {
          "commands": [
            {
                "id": "menu-add",
                "locateInMenu": "always"
            },
            {
                "id": "menu-edit",
                "locateInMenu": "always"
            },
            {
                "id": "menu-remove",
                "locateInMenu": "always"
            }
          ]
      },
      "tizen-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "locateInMenu": "always"
          },
          {
            "id": "menu-edit",
            "locateInMenu": "always"
          },
          {
            "id": "menu-remove",
            "locateInMenu": "always"
          }
        ]
      },
      "generic-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "locateInMenu": "always"
          },
          {
            "id": "menu-edit",
            "locateInMenu": "always"
          },
          {
            "id": "menu-remove",
            "locateInMenu": "always"
          }
        ]
      }
    },
    "navigation": [
      {
        "title": "Form",
        "onExecute": "#Form",
        "icon": "todo"
      },
      {
        "title": "Overlays",
        "onExecute": "#Overlays",
        "icon": "tips"
      },
      {
        "title": "Lists",
        "onExecute": "#Lists",
        "icon": "card"
      },
      {
        "title": "Maps",
        "onExecute": "#Maps",
        "icon": "map"
      },
      {
        "title": "Gallery",
        "onExecute": "#Gallery",
        "icon": "photo"
      },
      {
        "title": "Custom Events",
        "onExecute": "#CustomEvents",
        "icon": "events"
      },
      {
        "title": "Icons",
        "onExecute": "#IconSet",
        "icon": "image"
      },
      {
        "title": "Calendar",
        "onExecute": "#Calendar",
        "icon": "clock"
      },
      {
        "title": "FX",
        "onExecute": "#fx",
        "icon": "favorites"
      }
    ]
  }
});