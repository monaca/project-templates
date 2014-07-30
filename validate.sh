#!/bin/bash
echo "Validating project_info.json..."

ls -1 */.monaca/project_info.json | xargs -l jsonlint -q -c

echo "Finished."
