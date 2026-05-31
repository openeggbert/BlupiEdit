using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace BlupiEdit
{
	public partial class MainForm : Form
	{
		int userid, levelnum;
		private LevelItem selectedItem = null;

		public MainForm()
		{
			InitializeComponent();

			tilePanel.Paint += tilePanel_Paint;
			objectPanel.Paint += objectPanel_Paint;
			objectPanel.MouseClick += objectPanel_MouseClick;
			hScrollBar1.Scroll += delegate { tilePanel.Invalidate(); };
			vScrollBar1.Scroll += delegate { tilePanel.Invalidate(); };
			hScrollBar2.Scroll += delegate { objectPanel.Invalidate(); };
			vScrollBar2.Scroll += delegate { objectPanel.Invalidate(); };
			tilePanel.Resize += delegate { RefreshCurrentLevelView(); };
		}

		private void MainForm_Load(object sender, EventArgs e)
		{
			if (Program.Arguments.Length > 0)
				LoadGame(Program.Arguments[0]);
		}

		private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
		{
			if (LevelData.CurrentLevel != null)
				switch (MessageBox.Show(this, "Do you want to save?", "BlupiEdit", MessageBoxButtons.YesNoCancel))
				{
					case DialogResult.Yes:
						LevelData.SaveLevel();
						break;
					case DialogResult.Cancel:
						e.Cancel = true;
						break;
				}
		}

		private void openToolStripMenuItem_Click(object sender, EventArgs e)
		{
			using (OpenFileDialog fd = new OpenFileDialog() { DefaultExt = "exe", Filter = "EXE Files|*.exe", RestoreDirectory = true })
				if (fd.ShowDialog(this) == DialogResult.OK)
					LoadGame(fd.FileName);
		}

		private void LoadGame(string filename)
		{
			LevelData.LoadGame(filename);
			changeLevelToolStripMenuItem.Enabled = true;
		}

		private void changeLevelToolStripMenuItem_Click(object sender, EventArgs e)
		{
			using (LevelSelectForm ls = new LevelSelectForm(LevelSelectFormMode.Open))
				if (ls.ShowDialog(this) == DialogResult.OK)
				{
					userid = ls.UserID;
					levelnum = ls.LevelNum;
					LevelData.LoadLevel(userid, levelnum);
					UpdateFormText();
					RefreshCurrentLevelView();
					saveAsToolStripMenuItem.Enabled = saveToolStripMenuItem.Enabled = true;
				}
		}

		private void UpdateFormText()
		{
			StringBuilder sb = new StringBuilder("BlupiEdit - Speedy Blupi");
			if (LevelData.IsBlupi2) sb.Append(" 2");
			sb.Append(" - ");
			if (userid == 0)
				sb.AppendFormat("World {0:000}", levelnum);
			else
				sb.AppendFormat("User {0} Design {1:000}", userid, levelnum);
			if (!string.IsNullOrEmpty(LevelData.CurrentLevel.LevelName))
				sb.AppendFormat(" - {0}", LevelData.CurrentLevel.LevelName);
			Text = sb.ToString();
		}

		private void saveToolStripMenuItem_Click(object sender, EventArgs e)
		{
			LevelData.SaveLevel();
		}

		private void saveAsToolStripMenuItem_Click(object sender, EventArgs e)
		{
			using (LevelSelectForm ls = new LevelSelectForm(LevelSelectFormMode.Save))
				if (ls.ShowDialog(this) == DialogResult.OK)
				{
					userid = ls.UserID;
					levelnum = ls.LevelNum;
					LevelData.ChangeLevelPath(userid, levelnum);
					LevelData.SaveLevel();
					UpdateFormText();
				}
		}

		private void exitToolStripMenuItem_Click(object sender, EventArgs e)
		{
			Close();
		}

		private void RefreshCurrentLevelView()
		{
			Console.WriteLine("[BlupiEdit] RefreshCurrentLevelView");
			if (LevelData.CurrentLevel == null)
			{
				Console.WriteLine("[BlupiEdit] CurrentLevel loaded: false");
				return;
			}
			Console.WriteLine("[BlupiEdit] CurrentLevel loaded: true");
			Console.WriteLine("[BlupiEdit] Level size: " + LevelData.LevelSize + "x" + LevelData.LevelSize + " PixelSize: " + LevelData.PixelSize);
			Console.WriteLine("[BlupiEdit] Items count: " + LevelData.CurrentLevel.Items.Count);
			int objCount = (LevelData.TileImages != null && LevelData.TileImages.ContainsKey(TileTypes.Object))
				? LevelData.TileImages[TileTypes.Object].Length : 0;
			Console.WriteLine("[BlupiEdit] TileImages Object count: " + objCount);

			// Enable UI panels
			tableLayoutPanel1.Enabled = true;
			tableLayoutPanel2.Enabled = true;
			toolStrip1.Enabled = true;
			tileList1.Enabled = true;
			propertyGrid1.Enabled = true;

			// Setup scrollbars for tilePanel
			int panelW = tilePanel.Width;
			int panelH = tilePanel.Height;
			hScrollBar1.Minimum = 0;
			hScrollBar1.Maximum = Math.Max(0, LevelData.PixelSize - panelW);
			hScrollBar1.SmallChange = LevelData.GridSize;
			hScrollBar1.LargeChange = Math.Max(1, panelW);
			hScrollBar1.Value = 0;
			vScrollBar1.Minimum = 0;
			vScrollBar1.Maximum = Math.Max(0, LevelData.PixelSize - panelH);
			vScrollBar1.SmallChange = LevelData.GridSize;
			vScrollBar1.LargeChange = Math.Max(1, panelH);
			vScrollBar1.Value = 0;

			// Setup scrollbars for objectPanel
			int objPanelW = objectPanel.Width;
			int objPanelH = objectPanel.Height;
			hScrollBar2.Minimum = 0;
			hScrollBar2.Maximum = Math.Max(0, LevelData.PixelSize - objPanelW);
			hScrollBar2.SmallChange = LevelData.GridSize;
			hScrollBar2.LargeChange = Math.Max(1, objPanelW);
			hScrollBar2.Value = 0;
			vScrollBar2.Minimum = 0;
			vScrollBar2.Maximum = Math.Max(0, LevelData.PixelSize - objPanelH);
			vScrollBar2.SmallChange = LevelData.GridSize;
			vScrollBar2.LargeChange = Math.Max(1, objPanelH);
			vScrollBar2.Value = 0;

			// Populate tileList1 with Object tile images
			tileList1.Images.Clear();
			if (LevelData.TileImages != null && LevelData.TileImages.ContainsKey(TileTypes.Object))
			{
				Sprite[] sprites = LevelData.TileImages[TileTypes.Object];
				tileList1.ImageSize = 64;
				foreach (Sprite spr in sprites)
					tileList1.Images.Add(spr.Image);
			}
			tileList1.ChangeSize();
			tileList1.SelectedIndex = -1;

			// Trigger redraws
			tilePanel.Invalidate();
			objectPanel.Invalidate();

			// Set propertyGrid to level view model
			propertyGrid1.SelectedObject = new LevelViewModel(LevelData.CurrentLevel);
			Console.WriteLine("[BlupiEdit] PropertyGrid assigned: true");
			Console.WriteLine("[BlupiEdit] Object panel exists: true");
		}

		private void tilePanel_Paint(object sender, PaintEventArgs e)
		{
			LevelData level = LevelData.CurrentLevel;
			if (level == null) return;

			Graphics gfx = e.Graphics;
			gfx.SetOptions();

			int scrollX = hScrollBar1.Value;
			int scrollY = vScrollBar1.Value;

			// Draw background decor
			try
			{
				using (Bitmap bg = LevelData.LoadImage(string.Format("decor{0:000}", level.Background)))
					for (int x = -scrollX / 2; x < tilePanel.Width + 640; x += 640)
						for (int y = -scrollY / 2; y < tilePanel.Height + 480; y += 480)
							gfx.DrawImage(bg, x, y, bg.Width, bg.Height);
			}
			catch (Exception ex)
			{
				Console.WriteLine("[BlupiEdit] tilePanel_Paint: background error: " + ex.Message);
			}

			// Draw tiles grid
			if (LevelData.TileImages != null && LevelData.TileImages.ContainsKey(TileTypes.Object))
			{
				Sprite[] objSprites = LevelData.TileImages[TileTypes.Object];
				int xStart = Math.Max(scrollX / LevelData.GridSize, 0);
				int yStart = Math.Max(scrollY / LevelData.GridSize, 0);
				int xEnd = Math.Min((scrollX + tilePanel.Width) / LevelData.GridSize + 1, LevelData.LevelSize);
				int yEnd = Math.Min((scrollY + tilePanel.Height) / LevelData.GridSize + 1, LevelData.LevelSize);

				for (int ty = yStart; ty < yEnd; ty++)
					for (int tx = xStart; tx < xEnd; tx++)
					{
						short tileIdx = level.Tiles[tx, ty];
						if (tileIdx < 0 || tileIdx >= objSprites.Length) continue;
						gfx.DrawSprite(objSprites[tileIdx],
							new Point(tx * LevelData.GridSize - scrollX, ty * LevelData.GridSize - scrollY));
					}
			}

			// Draw Blupi start position
			if (LevelData.TileImages != null && LevelData.TileImages.ContainsKey(TileTypes.Blupi000))
			{
				try
				{
					Sprite[] blupiSprites = LevelData.TileImages[TileTypes.Blupi000];
					int sprIdx = level.StartDirections[0] ? 0 : 1;
					if (sprIdx < blupiSprites.Length)
						gfx.DrawSprite(blupiSprites[sprIdx],
							level.StartPositions[0] - new Size(scrollX, scrollY));
				}
				catch (Exception ex)
				{
					Console.WriteLine("[BlupiEdit] tilePanel_Paint: blupi draw error: " + ex.Message);
				}
			}

			// Draw items
			foreach (LevelItem item in level.Items)
			{
				if (LevelData.TileImages == null || !LevelData.TileImages.ContainsKey(item.ArtFile)) continue;
				Sprite[] sprites = LevelData.TileImages[item.ArtFile];
				if (item.Tile >= sprites.Length) continue;
				try
				{
					gfx.DrawSprite(sprites[item.Tile], item.PointA - new Size(scrollX, scrollY));
				}
				catch (Exception ex)
				{
					Console.WriteLine("[BlupiEdit] tilePanel_Paint: item draw error: " + ex.Message);
				}
			}
		}

		private void objectPanel_MouseClick(object sender, MouseEventArgs e)
		{
			LevelData level = LevelData.CurrentLevel;
			if (level == null) return;

			int scrollX = hScrollBar2.Value;
			int scrollY = vScrollBar2.Value;
			Point clickWorld = new Point(e.X + scrollX, e.Y + scrollY);

			LevelItem best = null;
			int bestDist = int.MaxValue;
			foreach (LevelItem item in level.Items)
			{
				int dx = item.PointA.X - clickWorld.X;
				int dy = item.PointA.Y - clickWorld.Y;
				int dist = dx * dx + dy * dy;
				if (dist < bestDist && dist < (LevelData.GridSize * LevelData.GridSize))
				{
					best = item;
					bestDist = dist;
				}
			}

			selectedItem = best;
			if (selectedItem != null)
				propertyGrid1.SelectedObject = selectedItem;
			else
				propertyGrid1.SelectedObject = (LevelData.CurrentLevel != null) ? (object)new LevelViewModel(LevelData.CurrentLevel) : null;
			objectPanel.Invalidate();
		}

		private void objectPanel_Paint(object sender, PaintEventArgs e)
		{
			LevelData level = LevelData.CurrentLevel;
			if (level == null) return;

			Graphics gfx = e.Graphics;
			gfx.SetOptions();

			int scrollX = hScrollBar2.Value;
			int scrollY = vScrollBar2.Value;

			// Draw background decor
			try
			{
				using (Bitmap bg = LevelData.LoadImage(string.Format("decor{0:000}", level.Background)))
					for (int x = -scrollX / 2; x < objectPanel.Width + 640; x += 640)
						for (int y = -scrollY / 2; y < objectPanel.Height + 480; y += 480)
							gfx.DrawImage(bg, x, y, bg.Width, bg.Height);
			}
			catch (Exception ex)
			{
				Console.WriteLine("[BlupiEdit] objectPanel_Paint: background error: " + ex.Message);
			}

			// Draw items
			foreach (LevelItem item in level.Items)
			{
				if (LevelData.TileImages == null || !LevelData.TileImages.ContainsKey(item.ArtFile)) continue;
				Sprite[] sprites = LevelData.TileImages[item.ArtFile];
				if (item.Tile >= sprites.Length) continue;
				try
				{
					Point drawPos = item.PointA - new Size(scrollX, scrollY);
					gfx.DrawSprite(sprites[item.Tile], drawPos);
					// Highlight selected item
					if (item == selectedItem)
					{
 					Size sprSize = sprites[item.Tile].Image != null
 						? sprites[item.Tile].Image.Size
 						: new Size(LevelData.GridSize, LevelData.GridSize);
 					gfx.DrawRectangle(Pens.Yellow,
 						drawPos.X + sprites[item.Tile].Offset.X,
 						drawPos.Y + sprites[item.Tile].Offset.Y,
 						sprSize.Width - 1,
 						sprSize.Height - 1);
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine("[BlupiEdit] objectPanel_Paint: item draw error: " + ex.Message);
				}
			}
		}
	}
}