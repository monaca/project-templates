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

    // Copy common files from Hello World
    echo "Copy to $template\n";
    foreach (['platforms', 'config.xml'] as $path) {
      system(sprintf('cp -r %s %s', escapeshellarg($helloTemplate . '/' . $path), escapeshellarg($template . '/')));
    }

    // Set name tag
    $projectInfo = json_decode(file_get_contents($template . '/.monaca/project_info.json'), true);
    if (!$projectInfo) {
      throw new Exception('Failed to parse project_info.json in ' . $template);
    }
    
    $configXmlFilename = $template . '/config.xml';
    $configXml = file_get_contents($configXmlFilename);
    $configXml = preg_replace('/<name>[\w ]+<\/name>/', '<name>' . $projectInfo['title-en'] . '</name>', $configXml);
    $configXml = preg_replace('/<description>[\w ]*<\/description>/', '<description></description>', $configXml);
    file_put_contents($configXmlFilename, $configXml);
  }
}

echo "Finished.\n";
