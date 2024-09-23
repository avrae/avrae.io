import os
import subprocess

DEST_PATH = 'src/assets'
INPUT_PATH = os.path.join(DEST_PATH, 'custom-themes')

print "Building custom theme scss files."

# Get the files
files = []
for root, _, filenames in os.walk(INPUT_PATH):
  for filename in filenames:
    if filename.endswith('.scss'):
      files.append(os.path.join(root, filename))

for file in files:
  filename = os.path.relpath(file, INPUT_PATH)
  basename = os.path.splitext(filename)[0]
  output_file = os.path.join(DEST_PATH, "{}.css".format(basename))
  subprocess.call([os.path.join('node_modules', '.bin', 'sass'), '-I', 'node_modules', file, output_file])

print "Finished building CSS."
