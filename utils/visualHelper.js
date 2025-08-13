import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export async function compareScreenshot(driver, element, baselinePath, currentPath, diffPath) {
    const image = await element.takeScreenshot(true);
    fs.writeFileSync(currentPath, image, 'base64');

    if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(currentPath, baselinePath);
        console.log(`Baseline dibuat: ${baselinePath}`);
        return { baselineCreated: true, mismatch: 0 };
    }

    const imgBaseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const imgCurrent = PNG.sync.read(fs.readFileSync(currentPath));
    const { width, height } = imgBaseline;
    const diff = new PNG({ width, height });

    const mismatch = pixelmatch(
        imgBaseline.data,
        imgCurrent.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
    );

    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    console.log(mismatch > 0
        ? `Visual mismatch: ${mismatch} pixel berbeda`
        : 'Visual match: tidak ada perbedaan pixel.');

    return { baselineCreated: false, mismatch };
}
