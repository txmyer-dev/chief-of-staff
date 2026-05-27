import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * env-sync.ts
 * 
 * Synchronizes 'public' keys from the Chief-of-Staff .env to the Global .env
 * based on the profile-manifest.json.
 */

const COS_DIR = '/root/chief-of-staff';
const GLOBAL_ENV = '/root/.env';
const MANIFEST_PATH = join(COS_DIR, 'Tools/profile-manifest.json');
const COS_ENV_PATH = join(COS_DIR, '.env');

function parseEnv(path: string): Record<string, string> {
    if (!existsSync(path)) return {};
    const content = readFileSync(path, 'utf8');
    return content.split('\n').reduce((acc, line) => {
        const [key, ...val] = line.split('=');
        if (key && !key.startsWith('#')) {
            acc[key.trim()] = val.join('=').trim();
        }
        return acc;
    }, {} as Record<string, string>);
}

function sync() {
    console.log('🔄 Starting .env sync...');
    
    if (!existsSync(MANIFEST_PATH)) {
        console.error('❌ Manifest not found at:', MANIFEST_PATH);
        return;
    }

    const manifestData = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
    const cosEnv = parseEnv(COS_ENV_PATH);
    const globalEnv = parseEnv(GLOBAL_ENV);

    const publicKeys = manifestData.manifest
        .filter((item: any) => item.tier === 'public')
        .map((item: any) => item.key);

    let updated = false;
    publicKeys.forEach((key: string) => {
        if (cosEnv[key]) {
            if (globalEnv[key] !== cosEnv[key]) {
                console.log(`✅ Syncing [${key}] to Global .env`);
                globalEnv[key] = cosEnv[key];
                updated = true;
            }
        } else {
            console.warn(`⚠️ Warning: [${key}] found in manifest but missing in CoS .env`);
        }
    });

    if (updated) {
        const newContent = Object.entries(globalEnv)
            .map(([k, v]) => `${k}=${v}`)
            .join('\n');
        writeFileSync(GLOBAL_ENV, newContent);
        console.log('✨ Global .env updated successfully.');
    } else {
        console.log('🙌 Global .env is already in sync with public manifest.');
    }
}

sync();
