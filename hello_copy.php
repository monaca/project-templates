<?php
/**
 * Copy platforms and config.xml files from Hello World to the other templates.
 *
 * @author Asial
 */
$helloTemplate = '0-helloworld';

chdir(__DIR__);

foreach (glob('*-*', GLOB_ONLYDIR) as $dir) {
  if ($dir != $helloTemplate && preg_match('/^\d+\-[a-z0-9\-]+$/', $dir)) {
    $template = $dir;
    echo "Copy to $template\n";

    foreach (['platforms', 'config.xml'] as $path) {
      system(sprintf('cp -r %s %s', escapeshellarg($helloTemplate . '/' . $path), escapeshellarg($template . '/')));
    }
  }
}

echo "Finished.\n";
