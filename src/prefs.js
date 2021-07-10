const { Adw, GObject, Gio, Gst, Gtk } = imports.gi;
const Misc = imports.src.misc;

const { settings } = Misc;

/* PlayFlags are not exported through GI */
Gst.PlayFlags = {
  VIDEO: 1,
  AUDIO: 2,
  TEXT: 4,
  VIS: 8,
  SOFT_VOLUME: 16,
  NATIVE_AUDIO: 32,
  NATIVE_VIDEO: 64,
  DOWNLOAD: 128,
  BUFFERING: 256,
  DEINTERLACE: 512,
  SOFT_COLORBALANCE: 1024,
  FORCE_FILTERS: 2048,
  FORCE_SW_DECODERS: 4096,
};

const props = {
    'schema-name': GObject.ParamSpec.string(
        'schema-name',
        'GSchema setting name',
        'Name of the setting to bind',
        GObject.ParamFlags.WRITABLE,
        null
    ),
};
const flags = Gio.SettingsBindFlags.DEFAULT;

GObject.registerClass({
    GTypeName: 'ClapperPrefsSwitch',
    Properties: props,
},
class extends Adw.ActionRow
{
    _init()
    {
        super._init();

        const widget = new Gtk.Switch({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
        });
        this.add_suffix(widget);
        this.set_activatable_widget(widget);
    }

    set schema_name(value)
    {
        settings.bind(value, this.activatable_widget, 'active', flags);
    }
});

var PrefsWindow = GObject.registerClass({
    GTypeName: 'ClapperPrefsWindow',
    Template: `file://${Misc.getClapperPath()}/ui/preferences-window.ui`,
},
class ClapperPrefsWindow extends Adw.PreferencesWindow
{
    _init(window)
    {
        super._init({
            transient_for: window,
        });

        this.show();
    }
});
