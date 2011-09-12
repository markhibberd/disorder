MODULE = disorder
GEN = gen
DIST = ${GEN}/dist
DIRS = ${GEN} ${DIST}
SRC = src/disorder.js src/disorder._.js src/disorder.fragment.js src/disorder.resolve.js src/disorder.loader.js
MODULE_DIST = ${DIST}/${MODULE}.all.js

.PHONY: clean size default

default: clean ${MODULE_DIST}

${MODULE_DIST}: ${SRC} ${DIST}
	cat ${SRC} > $@

${DIRS}:
	mkdir -p $@

size:
	find src -name \*.js -print0 | xargs -0 wc | sort -n

clean:
	rm -rf ${GEN}
