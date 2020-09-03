Ext.require([
    'GeoExt.component.Map',
    'GeoExt.data.store.LayersTree'
]);

/**
 * A plugin for Ext.grid.column.Column s that overwrites the internal cellTpl to
 * support legends.
 */
Ext.define('BasicTreeColumnLegends', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.basic_tree_column_legend',

    /**
     * @private
     */
    originalCellTpl: Ext.clone(Ext.tree.Column.prototype.cellTpl).join(''),

    /**
     * The Xtemplate strings that will be used instead of the plain {value}
     * when rendering
     */
    valueReplacementTpl: [
        '{value}',
        '<tpl if="this.hasLegend(values.record)"><br />',
        '<tpl for="lines">',
        '<img src="{parent.blankUrl}"',
        ' class="{parent.childCls} {parent.elbowCls}-img ',
        '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>"',
        ' role="presentation"/>',
        '</tpl>',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '{[this.getLegendHtml(values.record)]}',
        '</tpl>'
    ],

    /**
     * The context for methods available in the template
     */
    valueReplacementContext: {
        hasLegend: function(rec) {
            var isChecked = rec.get('checked');
            var layer = rec.data;
            return isChecked && !(layer instanceof ol.layer.Group);
        },
        getLegendHtml: function(rec) {
            var layer = rec.data;
            var legendUrl = layer.get('legendUrl');
            if (!legendUrl) {
                legendUrl = 'https://geoext.github.io/geoext2/' +
                    'website-resources/img/GeoExt-logo.png';
            }
            return '<img class="legend" src="' + legendUrl + '" height="32" />';
        }
    },

    init: function(column) {
        var me = this;
        if (!(column instanceof Ext.grid.column.Column)) {
            Ext.log.warn('Plugin shall only be applied to instances of' +
                    ' Ext.grid.column.Column');
            return;
        }
        var valuePlaceHolderRegExp = /\{value\}/g;
        var replacementTpl = me.valueReplacementTpl.join('');
        var newCellTpl = me.originalCellTpl.replace(
            valuePlaceHolderRegExp, replacementTpl
        );

        column.cellTpl = [
            newCellTpl,
            me.valueReplacementContext
        ];
    }
});

var mapComponent;
var mapPanel;
var treePanel;
var treePanel2;

Ext.application({
    name: 'LegendTrees',
    launch: function() {
        var source1;
        var source2;
        var source3;
        var source4;
        var source5;
        var source6;
        var source7;
        var source8;
        var source9;
        var source10;
        var source11;
        var source12;
        var source13;
        var source14;
        var layer1;
        var layer2;
        var layer3;
        var layer4;
        var layer5;
        var layer6;
        var layer7;
        var layer8;
        var layer9;
        var layer10;
        var layer11;
        var layer12;
        var layer13;
        var source14;
        var source15;
        var group;
        var group2;
        var group3;
        var olMap;
        var treeStore;
        var treeStore2;

        source1 = new ol.source.Stamen({layer: 'watercolor'});
        layer1 = new ol.layer.Tile({
            legendUrl: 'https://stamen-tiles-d.a.ssl.fastly.net/' +
                'watercolor/2/1/0.jpg',
            source: source1,
            name: 'Stamen Watercolor'
        });

        source2 = new ol.source.Stamen({layer: 'terrain-labels'});
        layer2 = new ol.layer.Tile({
            legendUrl: 'https://stamen-tiles-b.a.ssl.fastly.net/' +
                'terrain-labels/4/4/6.png',
            source: source2,
            name: 'Stamen Terrain Labels'
        });


        /*----------------- MAPA ECUADOR -----------------------*/

        source3 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'nxprovincias', 'TILED': true}
        });
        layer3 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source3,
            name: 'Categorizacion por Provincias',
            visible: false
        });


        source14 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'nxprovincias2', 'TILED': true}
        });
        layer14 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source14,
            name: 'Provincias',
            visible: false
        });

        source4 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'nxcantones', 'TILED': true}
        });
        layer4 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source4,
            name: 'Cantones',
            visible: false
        });

        source5 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'nxparroquias', 'TILED': true}
        });
        layer5 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source5,
            name: 'Parroquias',
            visible: false
        });

        source6 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'aeropuertos2', 'TILED': true}
        });
        layer6 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source6,
            name: 'Aeropuertos',
            visible: false
        });

        source7 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'ferrocarril2', 'TILED': true}
        });
        layer7 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source7,
            name: 'Ferrocarril',
            visible: false
        });

        source8 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'via_l', 'TILED': true}
        });
        layer8 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source8,
            name: 'Vias',
            visible: false
        });

        source9 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'poblacion', 'TILED': true}
        });
        layer9 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source9,
            name: 'Poblacion',
            visible: false
        });

        source10 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'islas', 'TILED': true}
        });
        layer10 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source10,
            name: 'Islas',
            visible: false
        });


        source12 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'curva_nivel_l', 'TILED': true}
        });
        layer12 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source12,
            name: 'Curva de nivel',
            visible: false
        });

        source13 = new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/workspace/wms',
            params: {'LAYERS': 'rio_l', 'TILED': true}
        });
        layer13 = new ol.layer.Tile({
            legendUrl: 'http://localhost:8080/geoserver/workspace/wms?',
            source: source13,
            name: 'Rios',
            visible: false
        });

        
        /*----------------- FIN MAPA ECUADOR -----------------------*/



        layer15 = new ol.layer.Vector({
            source: new ol.source.Vector(),
            name: 'Vector '
        });

        group = new ol.layer.Group({
            layers: [layer1, layer2],
            name: 'Some Stamen Layers'
        });

        group2 = new ol.layer.Group({
            layers: [layer6, layer7, layer8],
            name: 'Transportacion'
        }); 
   

        group3 = new ol.layer.Group({
            layers: [layer3,layer14, layer4, layer5],
            name: 'División Político Administrativa del Ecuador'
        });  


        olMap = new ol.Map({
            layers: [group, group3, group2, layer9, layer10, layer12, layer13],
            view: new ol.View({
                center: [-8900000, -199999.088],
                zoom: 7.2,
            })
        });

        mapComponent = Ext.create('GeoExt.component.Map', {
            map: olMap
        });

        mapPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [mapComponent]
        });

        treeStore = Ext.create('GeoExt.data.store.LayersTree', {
            layerGroup: olMap.getLayerGroup()
        });

        treePanel = Ext.create('Ext.tree.Panel', {
            title: 'Capas',
            store: treeStore,
            border: false,
            rootVisible: false,
            hideHeaders: true,
            lines: false,
            flex: 1,
            columns: {
                header: false,
                items: [
                    {
                        xtype: 'treecolumn',
                        dataIndex: 'text',
                        flex: 1,
                        plugins: [
                            {
                                ptype: 'basic_tree_column_legend'
                            }
                        ]
                    }
                ]
            }
        });

        treeStore2 = Ext.create('GeoExt.data.store.LayersTree', {
            layerGroup: olMap.getLayerGroup()
        });


        var description = Ext.create('Ext.panel.Panel', {
            contentEl: 'description',
            title: 'MAPA DEL ECUADOR',
            height: 200,
            border: false,
            bodyPadding: 5
        });

        Ext.create('Ext.Viewport', {
            layout: 'border',
            items: [
                mapPanel,
                {
                    xtype: 'panel',
                    region: 'west',
                    width: 400,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        treePanel,
                        description,
                        treePanel2
                    ]
                }
            ]
        });
    }
});
