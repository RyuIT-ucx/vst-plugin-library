import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPlugins, getPluginById, createPlugin } from '../services/api';

const mockPlugins = [
  { id: "1", name: "Serum", developer: "Xfer Records", categoryId: "1", type: "VST3", rating: 5, isFavorite: true },
  { id: "2", name: "FabFilter Pro-Q 3", developer: "FabFilter", categoryId: "5", type: "VST3", rating: 5, isFavorite: true },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

// Test 1
describe('getAllPlugins', () => {
  it('gibt alle Plugins zurück', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPlugins,
    });

    const result = await getAllPlugins();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Serum');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/plugins'));
  });
});

// Test 2
describe('getAllPlugins - Fehlerhandling', () => {
  it('wirft einen Fehler wenn die API fehlschlägt', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(getAllPlugins()).rejects.toThrow('Plugins konnten nicht geladen werden');
  });
});

// Test 3
describe('getPluginById', () => {
  it('gibt das richtige Plugin zurück', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPlugins[0],
    });

    const result = await getPluginById("1");
    expect(result.name).toBe('Serum');
    expect(result.developer).toBe('Xfer Records');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/plugins/1'));
  });
});

// Test 4
describe('getPluginById - Fehlerhandling', () => {
  it('wirft einen Fehler bei nicht existierender ID (404)', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(getPluginById("999")).rejects.toThrow('Plugin nicht gefunden');
  });
});

// Test 5
describe('createPlugin', () => {
  it('erstellt ein neues Plugin und gibt es zurück', async () => {
    const newPlugin = { name: "Massive", developer: "Native Instruments", categoryId: "1", type: "VST3" };
    const createdPlugin = { id: "4", ...newPlugin };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdPlugin,
    });

    const result = await createPlugin(newPlugin);
    expect(result.id).toBe("4");
    expect(result.name).toBe("Massive");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/plugins'),
      expect.objectContaining({ method: 'POST' })
    );
  });
});