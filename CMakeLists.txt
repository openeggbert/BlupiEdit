cmake_minimum_required(VERSION 3.20)
project(BlupiEdit_Mono NONE)

find_program(XBUILD_EXECUTABLE xbuild REQUIRED)
find_program(MONO_EXECUTABLE mono REQUIRED)

set(BLUPI_GAME_EXE "" CACHE STRING "Optional path to Speedy Blupi EXE")
set(OUT_DIR "${CMAKE_BINARY_DIR}/mono-output")

set(RUN_ARGS)
if(NOT BLUPI_GAME_EXE STREQUAL "")
    set(RUN_ARGS "${BLUPI_GAME_EXE}")
endif()

add_custom_target(BlupiEdit_build ALL
        COMMAND "${XBUILD_EXECUTABLE}"
        "${CMAKE_SOURCE_DIR}/BlupiEdit/BlupiEdit.csproj"
        "/p:Configuration=Debug"
        "/p:OutputPath=${OUT_DIR}/"
        WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
        USES_TERMINAL
        VERBATIM
)

add_custom_target(BlupiEdit_run
        COMMAND "${MONO_EXECUTABLE}" "${OUT_DIR}/BlupiEdit.exe" ${RUN_ARGS}
        DEPENDS BlupiEdit_build
        WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
        USES_TERMINAL
        VERBATIM
)
