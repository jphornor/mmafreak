#!/bin/bash
DEFAULTCOLOR="#174789"
NEWCOLOR=\#$1
NEWFILENAME=$2
SASS_OPTION="--relative-assets --no-line-comments -s expanded -c config.rb"
SASSDIR="source/skins"

SKINS=( "d02c2c:red"
        "1e65c6:blue-light"
        "112c50:blue-darken"
        "853b0f:brown-dark"
        "ab521c:brown-light"
        "2f6514:green-dark"
        "5c9c3c:green-light"
        "6a8012:lime-dark"
        "899639:lime-light"
        "910c3e:maroon-dark"
        "ba1a56:maroon-light"
        "588376:neutral-dark"
        "325f53:neutral-darken"
        "7fa498:neutral-light"
        "374f63:ordinary-dark"
        "5d88ac:ordinary-light"
        "642a72:purple-dark"
        "8f36a5:purple-light"
        "028173:turqoise-dark"
        "193b49:turqoise-darken"
        "0d9b8c:turqoise-light"
        "252525:black" )


# Change color variables
function change_variable {
echo "**** Merubah variable \$baseColor";
NEWCOLOR=\#$1
cat > $SASSDIR/_color.scss << EOT
\$baseColor: $NEWCOLOR
EOT
}

# Create file
function compile {
  echo "**** Buat file dengan nama yang ditentukan dari argumen";
  NEWFILENAME=$1
  cp $SASSDIR/_color-scheme.css.scss $SASSDIR/$NEWFILENAME.css.scss

  echo "**** Compiling Stylesheet. Tunggu Sebentar agak lama bro. Silakan ngupi dulu boleh";
  compass compile $SASSDIR/$NEWFILENAME.css.scss $SASS_OPTION
}

# Cleaning variables
function cleaning {
  echo "**** Hapus file scss yang telah dibuat, agar git repo tetap bersih";
  NEWFILENAME=$1
  rm $SASSDIR/$NEWFILENAME.css.scss
  
echo "**** Mengembalikan variable ke asal";
cat > $SASSDIR/_color.scss << EOT
\$baseColor: $DEFAULTCOLOR
EOT
  echo "**** DONE";
}

# Generate Skins
function generate {
  change_variable $1
  compile $NAME
  cleaning $NAME
}

# Generate skins defined in SKINS array
for skin in ${SKINS[@]} ; do
  COLOR=${skin%%:*}
  NAME=${skin##*:}
  generate $COLOR $NAME
done