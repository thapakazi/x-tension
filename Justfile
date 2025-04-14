# Justfile

set positional-arguments

# Variables for file and directory names.
extension_name := "x-tension"
build_zip := "x-tension.zip"
extension_id := "1234"

# Default task: build the zip package.
build:
    @echo "Building the Chrome extension package..."
    # Zip up the core extension files. Adjust if you have additional assets.
    zip -r {{build_zip}} manifest.json background.js content.js
    @echo "Package created: {{build_zip}}"

# Deploy task: builds the package then deploys it.
# If you plan to integrate with the Chrome Web Store API for a full automated deployment,
# add the necessary curl or CLI commands below.
deploy: build
    @echo "Deploying the extension..."
    @echo "NOTE: Automated deployment to the Chrome Web Store requires proper API integration."
    @echo "Please upload {{build_zip}} to your Chrome Developer Dashboard."
    # Example placeholder command for an automated deployment (requires proper setup):
    # curl -X POST "https://www.googleapis.com/chromewebstore/v1.1/items/{{extension_id}}" \
    #      -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    #      -F "file=@{{build_zip}}"
    @echo "Deployment step complete (placeholder)."

# Clean task: removes the generated build artifacts.
clean:
    @echo "Cleaning build artifacts..."
    rm -f {{build_zip}}
    @echo "Clean complete."

reset:
    @echo "resetting db..."
    cat db.json.org > db.json
    @echo "Db reset complete."

get-data title:
    curl -s localhost:3000/events | jq  -c ".[] | .${1}"
