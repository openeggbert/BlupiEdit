using System;
using System.ComponentModel;

namespace BlupiEdit
{
	// Read-only view model for level properties in PropertyGrid
	public class LevelViewModel
	{
		private LevelData level;
		public LevelViewModel(LevelData l) { level = l; }

		[Category("Level")]
		public string LevelName { get { return level.LevelName; } }
		[Category("Level")]
		public short Background { get { return level.Background; } }
		[Category("Level")]
		public short Music { get { return level.Music; } }
		[Category("Scroll")]
		public bool HorizontalScroll { get { return level.HorizontalScroll; } }
		[Category("Scroll")]
		public bool VerticalScroll { get { return level.VerticalScroll; } }
		[Category("Level")]
		public int ItemsCount { get { return level.Items == null ? 0 : level.Items.Count; } }
		[Category("Level")]
		public int Width { get { return LevelData.LevelSize; } }
		[Category("Level")]
		public int Height { get { return LevelData.LevelSize; } }
		[Category("Level")]
		public int PixelWidth { get { return LevelData.PixelSize; } }
		[Category("Level")]
		public int PixelHeight { get { return LevelData.PixelSize; } }
		[Category("Version")]
		public ushort MajorVersion { get { return level.MajorVersion; } }
		[Category("Version")]
		public ushort MinorVersion { get { return level.MinorVersion; } }
	}
}
