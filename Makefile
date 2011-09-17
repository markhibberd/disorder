MODULE = disorder
VERSION = 0.1

ETC = etc
WWW = ${ETC}/www

GEN = gen
DIST = ${GEN}/dist
DEMO = ${GEN}/demo

DIRS = ${GEN} ${DIST} ${DEMO}

SRC = src/disorder.js src/disorder._.js src/disorder.fragment.js src/disorder.resolve.js src/disorder.loader.js src/disorder.noconflict.js

PUBLISH_WWW = web@mth.io:${MODULE}.mth.io/data
PUBLISH_RELEASE = web@mth.io:${MODULE}.mth.io/data/release/.

MODULE_DIST = ${DIST}/${MODULE}.all.js
DEMO_DIST = ${DEMO}/demo.js

.PHONY: clean size default

default: clean ${MODULE_DIST} ${DEMO_DIST}

${MODULE_DIST}: ${SRC} ${DIST}
	cat ${SRC} > $@

${DEMO_DIST}: ${DEMO}
	cat demo/modules/blocks/*.js > $@

${DIRS}:
	mkdir -p $@

www:
	rsync -aH --stats --exclude \*~ ${WWW}/ ${PUBLISH_WWW}

size:
	find src -name \*.js -print0 | xargs -0 wc | sort -n

clean:
	rm -rf ${GEN}
